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
        if (!Schema::hasTable('camera_data')) {
            return;
        }

        if (!Schema::hasColumn('camera_data', 'fog_percentage')) {
            Schema::table('camera_data', function (Blueprint $table) {
                $table->double('fog_percentage')->nullable()->after('isFoggy');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (!Schema::hasTable('camera_data')) {
            return;
        }

        if (Schema::hasColumn('camera_data', 'fog_percentage')) {
            Schema::table('camera_data', function (Blueprint $table) {
                $table->dropColumn('fog_percentage');
            });
        }
    }
};
