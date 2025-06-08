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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->date('start_date');
            $table->time('start_time')->nullable();
            $table->date('end_date'); 
            $table->time('end_time')->nullable();
            $table->string("location")->nullable();
            $table->string("title");
            $table->string("calendarId")->nullable();
            $table->foreignUuid("user_id")->constrained()->onDelete('cascade');
            $table->json("people")->nullable();
            $table->string('tenant_id')->nullable();
            $table->foreign('tenant_id')->references('id')->on('tenants')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
