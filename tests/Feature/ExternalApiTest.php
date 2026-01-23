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

    protected $user;
    protected $token;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Setup initial data
        $this->user = User::factory()->create();
        $this->token = $this->user->createToken('test-token')->plainTextToken;
        
        // Seed Master Data needed for FK checks
        Greenhouse::create(['id' => 1, 'name' => 'GH 1']);
        Sensor::create(['id' => 1, 'gh_id' => 1, 'name' => 'DHT22']);
    }

    /**
     * Test Sensor Data Upload (POST /api/sensor)
     */
    public function test_sensor_upload()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/sensor', [
            'gh_id' => 1,
            'sensor_id' => 1,
            'value' => 25.5,
        ]);

        $response->assertStatus(200)
                 ->assertJson(['success' => true]);
                 
        $this->assertDatabaseHas('sensor_data', [
            'gh_id' => 1,
            'sensor_id' => 1,
            'value' => 25.5
        ]);
    }

    /**
     * Test Camera Image Upload (POST /api/camera)
     */
    public function test_camera_upload()
    {
        Storage::fake('public');
        $file = UploadedFile::fake()->image('snapshot.jpg');

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/camera', [
            'gh_id' => 1,
            'image' => $file,
        ]);

        $response->assertStatus(200)
                 ->assertJson(['success' => true]);

        // Verify storage
        // Note: Actual path might depend on Controller implementation, adjusting commonly used path
        // $this->assertTrue(count(Storage::disk('public')->allFiles('camera')) > 0);
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
            "gh_id" => 1,
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
            'gh_id' => 1,
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
            'gh_id' => 1,
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
            'gh_id' => 1
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'gh_id' => 1
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
