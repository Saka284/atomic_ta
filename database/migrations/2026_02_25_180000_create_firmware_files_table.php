<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFirmwareFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('firmware_files', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('node_id');
            $table->string('version', 20);
            $table->boolean('status')->default(false);
            $table->string('file_path');
            $table->string('file_url');
            $table->timestamps();

            $table->unique(['node_id', 'version']);
            $table->index(['node_id', 'status']);
            $table->index(['node_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('firmware_files');
    }
}
