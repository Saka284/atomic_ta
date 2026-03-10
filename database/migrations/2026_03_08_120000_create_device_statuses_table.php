<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('device_statuses')) {
            return;
        }

        Schema::create('device_statuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gh_id')->constrained('greenhouses')->cascadeOnDelete();
            $table->boolean('exhaust_status')->default(false);
            $table->boolean('dehumidifier_status')->default(false);
            $table->boolean('blower_status')->default(false);
            $table->timestamps();

            $table->unique('gh_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('device_statuses');
    }
};
