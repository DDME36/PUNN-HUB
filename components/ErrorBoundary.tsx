"use client";

import { Component, ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-200"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <AlertTriangle className="text-red-600" size={32} />
                        </motion.div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            เกิดข้อผิดพลาด
                        </h2>
                        
                        <p className="text-gray-600 mb-6">
                            ขออภัย เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง
                        </p>

                        {this.state.error && (
                            <details className="mb-6 text-left">
                                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                                    รายละเอียดข้อผิดพลาด
                                </summary>
                                <pre className="text-xs bg-gray-100 p-4 rounded-lg overflow-auto text-red-600">
                                    {this.state.error.message}
                                </pre>
                            </details>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.reload()}
                            className="w-full bg-gradient-to-r from-rose-400 to-purple-400 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={18} />
                            โหลดหน้าใหม่
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.history.back()}
                            className="w-full mt-3 bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-all"
                        >
                            กลับหน้าก่อนหน้า
                        </motion.button>
                    </motion.div>
                </div>
            );
        }

        return this.props.children;
    }
}
