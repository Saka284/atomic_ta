<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCameraDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('camera_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gh_id')->constrained('greenhouses', 'id');
            $table->longText('image');
            $table->boolean('isFoggy')->default(false);
            $table->double('confidence')->nullable();
            $table->dateTime('recorded_at');
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
        Schema::dropIfExists('camera_data');
    }
}
