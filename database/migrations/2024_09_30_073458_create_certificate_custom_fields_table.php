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
        Schema::create('certificate_custom_fields', function (Blueprint $table) {
            $table->id();
            $table->string("key");
            $table->text("value");
            $table->unsignedBigInteger("certificate_id");
            $table->foreign("certificate_id")->references("id")->on("certificates");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificate_custom_fields');
    }
};
