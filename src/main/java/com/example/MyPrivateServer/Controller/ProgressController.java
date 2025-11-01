package com.example.MyPrivateServer.Controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.time.Duration;

@RestController
public class ProgressController {

    private static final Sinks.Many<Integer> progressSink = Sinks.many().replay().latest();
    private static volatile int currentProgress = 0;

    @GetMapping(value = "/progress-stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamProgress() {
        // Stream progress setiap kali ada perubahan
        return progressSink.asFlux()
                .map(progress -> "data:" + progress + "\n\n")
                .doOnCancel(() -> System.out.println("🔌 Client disconnected from SSE"))
                .doOnError(err -> System.err.println("⚠️ SSE error: " + err.getMessage()));
    }

    public void setCurrentProgress(int progress) {
        currentProgress = progress;
        progressSink.tryEmitNext(progress); // kirim progress ke semua client yang aktif
    }
}
