import { useEffect, useState } from "react";

export function useScrollSpy(ids, offset = 0, threshold = 0.6) {
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {

        if (!ids || ids.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                root: null,
                rootMargin: `-${offset}px 0px 0px 0px`,
                threshold,
            }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [ids, offset, threshold]);

    return activeId;
}
