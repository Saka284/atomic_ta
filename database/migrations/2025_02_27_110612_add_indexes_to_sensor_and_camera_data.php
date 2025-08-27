<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIndexesToSensorAndCameraData extends Migration
{
    public function up()
    {
        Schema::table('sensor_data', function (Blueprint $table) {
            $table->index(['sensor_id', 'recorded_at'], 'idx_sensor_time');
            $table->index(['node_id', 'created_at'], 'idx_node_created');
            $table->index(['node_id', 'recorded_at'], 'idx_node_recorded');
        });

        Schema::table('camera_data', function (Blueprint $table) {
            $table->index(['gh_id', 'recorded_at'], 'idx_camera_gh_time');
        });
    }

    public function down()
    {
        Schema::table('sensor_data', function (Blueprint $table) {
            $table->dropIndex('idx_sensor_time');
            $table->dropIndex('idx_node_created');
            $table->dropIndex('idx_node_recorded');
        });

        Schema::table('camera_data', function (Blueprint $table) {
            $table->dropIndex('idx_camera_gh_time');
        });
    }
}
