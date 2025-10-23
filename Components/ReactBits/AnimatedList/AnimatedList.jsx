import { motion, AnimatePresence } from "framer-motion";

const AnimatedList = ({
    items = [],
    renderItem,
    showGradients = false,
    enableArrowNavigation = false,
    displayScrollbar = true,
}) => {
    return (
        <div
            className={`relative w-full ${displayScrollbar ? "overflow-y-auto" : "overflow-hidden"
                }`}
        >
            {showGradients && (
                <>
                    <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
                </>
            )}

            <AnimatePresence>
                {items.map((item, index) => (
                    <motion.div
                        key={item?.id || index}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                    >
                        {renderItem ? (
                            renderItem(item, index)
                        ) : (
                            <div className="p-3 border-b border-gray-100">
                                {typeof item === "object"
                                    ? JSON.stringify(item)
                                    : item}
                            </div>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default AnimatedList;
