<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sensor_snapshots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sensor_id')->constrained('sensors')->onDelete('cascade');
            $table->integer('node_id');
            $table->float('value');
            $table->timestamp('recorded_at');
            $table->timestamps();

            // The Secret Sauce: Unique Constraint for UPSERT
            $table->unique(['sensor_id', 'node_id'], 'unique_sensor_node_snapshot');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sensor_snapshots');
    }
};
