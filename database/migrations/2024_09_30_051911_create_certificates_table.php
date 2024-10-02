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
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string("certifier_name");
            $table->string("iqama");
            $table->string("company"); // TODO: Make is a separate table
            $table->string("ref_no")->unique();
            $table->string("witness");
            $table->date("issuedAt")->default(now());
            $table->date("expireAt");

            $table->unsignedBigInteger("certificate_type_id");
            $table->foreign("certificate_type_id")->references("id")->on("certificate_types");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
