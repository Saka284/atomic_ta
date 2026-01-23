<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gh_id')->constrained('greenhouses', 'id')->onDelete('cascade');
            $table->boolean('enabled')->default(true);
            $table->time('start_time');
            $table->time('end_time');
            $table->enum('relay_exhaust', ['on', 'off', 'threshold'])->default('threshold');
            $table->enum('relay_dehumidifier', ['on', 'off', 'threshold'])->default('threshold');
            $table->enum('relay_blower', ['on', 'off', 'threshold'])->default('threshold');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedules');
    }
}
