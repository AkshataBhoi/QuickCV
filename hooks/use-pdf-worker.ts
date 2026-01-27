
import { useState, useEffect, useRef } from 'react';

type WorkerStatus = 'idle' | 'working' | 'success' | 'error';

export function usePDFWorker() {
    const [status, setStatus] = useState<WorkerStatus>('idle');
    const [result, setResult] = useState<string | null>(null);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        // Initialize worker
        workerRef.current = new Worker('/workers/pdf-worker.js');

        workerRef.current.onmessage = (e) => {
            const { type, result, error } = e.data;
            if (type === 'SUCCESS') {
                setResult(result);
                setStatus('success');
            } else if (type === 'ERROR') {
                console.error('Worker Error:', error);
                setStatus('error');
            }
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const generatePDF = (data: any) => {
        setStatus('working');
        workerRef.current?.postMessage({ type: 'GENERATE_PDF', payload: data });
    };

    return { generatePDF, status, result };
}
