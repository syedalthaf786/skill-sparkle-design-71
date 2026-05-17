import { motion } from "framer-motion";
import logo from "../../assets/logo1.png"; 
export function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_70%)]" />

      <div className="relative flex flex-col items-center">
       <span className="grid h-36 w-36 place-items-center rounded-lg overflow-hidden">
            <img src={logo} alt="Svms Technologies" className="h-full w-full object-contain" />
          </span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-2xl font-bold"
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
