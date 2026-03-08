<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Greenhouse;
use App\Models\Schedule;
use App\Models\Sensor;
use Tests\TestCase;

class ExternalApiTest extends TestCase
{
    use DatabaseTransactions;

    protected $greenhouse;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Setup initial data
        $this->user = User::factory()->create();
        $this->token = $this->user->createToken('test-token')->plainTextToken;
        
        // Seed Master Data needed for FK checks
        $this->greenhouse = Greenhouse::create(['name' => 'GH 1']);
        
        // Controller expects specific sensor names
        Sensor::create(['gh_id' => $this->greenhouse->id, 'name' => 'Temperature']);
        Sensor::create(['gh_id' => $this->greenhouse->id, 'name' => 'Humidity']);
        Sensor::create(['gh_id' => $this->greenhouse->id, 'name' => 'Light Intensity']);
        Sensor::create(['gh_id' => $this->greenhouse->id, 'name' => 'RSSI']);
    }

    /**
     * Test Sensor Data Upload (POST /api/sensor)
     */
    public function test_sensor_upload()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/sensor', [
            'gh_id' => $this->greenhouse->id,
            'node_id' => 1,
            'temperature' => 25.5,
            'humidity' => 60,
            'light_intensity' => 1000,
            'rssi' => -60,
            'recorded_at' => now()->toDateTimeString(),
        ]);

        $response->assertStatus(200)
                 ->assertJson(['success' => true]);
                 
        $this->assertDatabaseHas('sensor_data', [
            'node_id' => 1,
            'value' => 25.5
        ]);
    }

    /**
     * Test Camera Image Upload (POST /api/camera)
     */
    public function test_camera_upload()
    {
        Storage::fake('public');
        // Simple base64 image 1x1 pixel jpg
        $base64Image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=';

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/camera', [
            'gh_id' => $this->greenhouse->id,
            'isFoggy' => false,
            'recorded_at' => now()->toDateTimeString(),
            'image' => $base64Image,
        ]);

        $response->assertStatus(200)
                 ->assertJson(['success' => true]);
    }

    /**
     * Test OTA Check (GET /api/get-file/{nodeId})
     */
    public function test_ota_check()
    {
        Storage::fake('public');
        $file = UploadedFile::fake()->create('firmware.bin', 256, 'application/octet-stream');

        $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->post('/api/files', [
            'status' => 1,
            'version' => '1.2.3',
            'node_id' => 1,
            'file' => $file,
        ])->assertStatus(200);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->getJson('/api/get-file/1');

        $response->assertStatus(200)
            ->assertJson([
                'version' => '1.2.3',
                'status' => 1,
                'node_id' => 1,
            ])
            ->assertJsonStructure([
                'version',
                'file_url',
                'status',
                'node_id',
            ]);

        $this->assertArrayNotHasKey('firmware_url', $response->json());
    }

    /**
     * Test OTA upload supports node_id alias
     */
    public function test_ota_upload_with_node_id_alias()
    {
        Storage::fake('public');
        $file = UploadedFile::fake()->create('firmware.bin', 256, 'application/octet-stream');

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->post('/api/files', [
            'status' => 1,
            'version' => '1.2.3',
            'node_id' => 7,
            'file' => $file,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 1,
                'node_id' => 7,
                'sensor_id' => 7,
                'version' => '1.2.3',
            ])
            ->assertJsonStructure([
                'file_url',
                'status',
                'sensor_id',
                'node_id',
                'version',
                'metadata_persisted',
            ]);

        $this->assertArrayNotHasKey('firmware_url', $response->json());
    }

    /**
     * Test OTA check supports node_id query parameter
     */
    public function test_ota_check_supports_node_id_query()
    {
        Storage::fake('public');
        $file = UploadedFile::fake()->create('firmware.bin', 256, 'application/octet-stream');

        $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->post('/api/files', [
            'status' => 1,
            'version' => '2.0.0',
            'node_id' => 10,
            'file' => $file,
        ])->assertStatus(200);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->getJson('/api/get-file?node_id=10');

        $response->assertStatus(200)
            ->assertJson([
                'version' => '2.0.0',
                'status' => 1,
                'node_id' => 10,
            ])
            ->assertJsonStructure([
                'version',
                'file_url',
                'status',
                'node_id',
            ]);

        $this->assertArrayNotHasKey('firmware_url', $response->json());
    }

    /**
     * Test Save Schedules (POST /api/schedules)
     */
    public function test_save_schedules()
    {
        $payload = [
            "gh_id" => $this->greenhouse->id,
            "schedules" => [
                [
                    "enabled" => true,
                    "start_time" => "08:00",
                    "end_time" => "12:00",
                    "actuators" => [
                        "blower" => "on",
                        "exhaust" => "threshold",
                        "dehumidifier" => "off"
                    ]
                ]
            ]
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/schedules', $payload);

        $response->assertStatus(200)
                 ->assertJson(['success' => true]);

        $this->assertDatabaseHas('schedules', [
            'gh_id' => $this->greenhouse->id,
            'start_time' => '08:00:00',
            'relay_exhaust' => 'threshold'
        ]);
    }

    /**
     * Test Gateway cache key respects schedule_id filter
     */
    public function test_gateway_schedule_cache_respects_schedule_id_filter()
    {
        $scheduleA = Schedule::create([
            'gh_id' => $this->greenhouse->id,
            'enabled' => true,
            'start_time' => '08:00:00',
            'end_time' => '09:00:00',
            'relay_exhaust' => 'on',
            'relay_dehumidifier' => 'off',
            'relay_blower' => 'threshold',
        ]);

        $scheduleB = Schedule::create([
            'gh_id' => $this->greenhouse->id,
            'enabled' => true,
            'start_time' => '09:00:00',
            'end_time' => '10:00:00',
            'relay_exhaust' => 'off',
            'relay_dehumidifier' => 'on',
            'relay_blower' => 'threshold',
        ]);

        $responseA = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/gateway/schedule', [
            'gh_id' => $this->greenhouse->id,
            'schedule_id' => [$scheduleA->id],
        ]);

        $responseA->assertStatus(200)
            ->assertJsonPath('schedules.0.id', $scheduleA->id);

        $responseB = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/gateway/schedule', [
            'gh_id' => $this->greenhouse->id,
            'schedule_id' => [$scheduleB->id],
        ]);

        $responseB->assertStatus(200)
            ->assertJsonPath('schedules.0.id', $scheduleB->id);
    }

    /**
     * Test sensor throttle can be disabled via config
     */
    public function test_sensor_upload_interval_can_be_disabled()
    {
        config(['app.sensor_min_upload_interval_minutes' => 0]);

        $payload = [
            'gh_id' => $this->greenhouse->id,
            'node_id' => 99,
            'temperature' => 25.5,
            'humidity' => 60,
            'light_intensity' => 1000,
            'rssi' => -60,
            'recorded_at' => now()->toDateTimeString(),
        ];

        $firstResponse = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/sensor', $payload);
        $firstResponse->assertStatus(200)->assertJson(['success' => true]);

        $secondResponse = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/sensor', $payload);
        $secondResponse->assertStatus(200)->assertJson(['success' => true]);
    }

    /**
     * Test Gateway Get Schedule (POST /api/gateway/schedule)
     */
    public function test_gateway_get_schedule()
    {
        // Create a schedule first
        Schedule::create([
            'gh_id' => $this->greenhouse->id,
            'enabled' => true,
            'start_time' => '08:00:00',
            'end_time' => '12:00:00',
            'relay_exhaust' => 'on',
            'relay_dehumidifier' => 'off',
            'relay_blower' => 'threshold',
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/gateway/schedule', [
            'gh_id' => $this->greenhouse->id
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'gh_id' => $this->greenhouse->id
                 ]);
        
        // Structure check
        $response->assertJsonStructure([
            'success',
            'gh_id',
            'schedules' => [
                '*' => ['id', 'aktif', 'mulai', 'selesai', 'relay']
            ]
        ]);
    }

    /**
     * Test device status POST and GET endpoints
     */
    public function test_device_status_post_and_get()
    {
        $postResponse = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/device_status', [
            'gh_id' => $this->greenhouse->id,
            'exhaust_status' => true,
        ]);

        $postResponse->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'gh_id' => $this->greenhouse->id,
                    'exhaust_status' => 1,
                    'dehumidifier_status' => 0,
                    'blower_status' => 0,
                ],
            ]);

        $getResponse = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->getJson('/api/get-device-status?gh_id=' . $this->greenhouse->id);

        $getResponse->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'gh_id' => $this->greenhouse->id,
                    'exhaust_status' => 1,
                    'dehumidifier_status' => 0,
                    'blower_status' => 0,
                ],
            ]);
    }
}
