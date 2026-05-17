import { motion } from "framer-motion";

export function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_70%)]" />

      <div className="relative flex flex-col items-center">
        <div className="relative mt-16 h-2 w-[320px] overflow-hidden rounded-full bg-muted">
          <motion.div
            animate={{ x: ["-100%", "250%"] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
            className="absolute top-0 h-full w-24 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600"
          />
        </div>

        <motion.div
          animate={{ x: [-140, 140] }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2,
            ease: "easeInOut",
          }}
          className="absolute top-0 flex items-center"
        >
          <div className="relative flex h-20 w-36 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 shadow-2xl">
            <div className="absolute left-3 top-5 h-5 w-5 rounded-full bg-white/80" />
            <div className="absolute right-3 top-5 h-5 w-5 rounded-full bg-white/80" />

            <span className="text-lg font-bold tracking-[0.3em] text-white">SVMS</span>

            <motion.div
              animate={{ y: [-10, -40], opacity: [0.7, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
              className="absolute -top-5 left-6 h-5 w-5 rounded-full bg-violet-300 blur-sm"
            />
          </div>

          <div className="ml-2 h-16 w-20 rounded-xl bg-violet-500 shadow-lg" />
          <div className="ml-2 h-16 w-20 rounded-xl bg-indigo-500 shadow-lg" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-28 text-2xl font-bold"
        >
          Loading Svms Technologies...
        </motion.h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Engineering the future of digital transformation.
        </p>
      </div>
    </div>
  );
}
