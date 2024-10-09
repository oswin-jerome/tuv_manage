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
            $table->string("label");
            $table->text("value");
            $table->text("type");
            $table->unsignedBigInteger("certificate_id");
            $table->unsignedBigInteger("custom_field_id");
            $table->foreign("custom_field_id")->references("id")->on("custom_fields");
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
