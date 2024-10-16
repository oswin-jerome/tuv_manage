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
            $table->string("certificate_name");
            $table->string("certifier_name");
            $table->string("iqama");
            $table->string("project")->nullable();
            $table->string("ref_no")->unique()->nullable();
            $table->string("witness");
            $table->date("issuedAt")->default(now());
            $table->date("expireAt")->nullable();

            $table->unsignedBigInteger("certificate_type_id");
            $table->foreign("certificate_type_id")->references("id")->on("certificate_types");

            $table->unsignedBigInteger("creator_id");
            $table->foreign("creator_id")->references("id")->on("users");

            $table->enum("approval_status", ["pending", "approved", "rejected"])->default("pending");

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
