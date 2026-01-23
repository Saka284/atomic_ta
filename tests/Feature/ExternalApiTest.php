<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Greenhouse;
use App\Models\Sensor;
use Tests\TestCase;

class ExternalApiTest extends TestCase
{
    use RefreshDatabase;

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
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->getJson('/api/get-file/1');

        $this->assertTrue(in_array($response->status(), [200, 404]));
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
     * Test Gateway Get Schedule (POST /api/gateway/schedule)
     */
    public function test_gateway_get_schedule()
    {
        // Create a schedule first
        \App\Models\Schedule::create([
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
}
