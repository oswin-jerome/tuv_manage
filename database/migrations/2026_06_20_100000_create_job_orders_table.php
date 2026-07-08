<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_orders', function (Blueprint $table) {
            $table->id();
            $table->string('department');
            $table->string('job_order_type'); // inspection / welder_qualifications
            $table->foreignId('creator_id')->constrained('users');
            $table->foreignId('assigned_to_id')->nullable()->constrained('users');
            $table->foreignId('company_id')->constrained('companies');
            $table->string('job_request_number')->nullable();
            $table->string('location')->nullable();
            $table->enum('status', ['active', 'completed', 'draft'])->default('active');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_orders');
    }
};
