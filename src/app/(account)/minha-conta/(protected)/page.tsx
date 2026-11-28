'use client';

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AccountHeader } from "@/components/layout/account-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AccountWelcome } from "@/components/account/account-banner";
import { MaterialSection, SkeletonPurchasedCard } from "@/components/account/material-section";
import { Material, MaterialType } from "@/types/material";
import { getMe, getMyPurchases } from "@/lib/api/customers";
import { getCustomerToken } from "@/lib/auth/cookies";
import { CUSTOMER_SIGNIN_ROUTE } from "@/lib/auth/routes";
import { BackVitrine } from "@/components/ui/back-vitrine";

export default function Conta() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [materials, setMaterials] = useState<Material[]>([]);
  const [materialsLoading, setMaterialsLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const token = getCustomerToken();

    if (!token) {
      router.replace(CUSTOMER_SIGNIN_ROUTE);
      return;
    }

    Promise.all([getMe(token), getMyPurchases(token)])
      .then(([me, purchases]) => {
        if (!active) return;
        setUserName(me.name ?? me.email ?? "");
        setMaterials([...purchases.student, ...purchases.teacher]);
      })
      .catch(() => {
        if (active) router.replace(CUSTOMER_SIGNIN_ROUTE);
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
        setMaterialsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [router]);

  const counts = useMemo(() => {
    const student = materials.filter((m) => m.category === MaterialType.STUDENT).length;
    const teacher = materials.filter((m) => m.category === MaterialType.TEACHER).length;
    return { student, teacher };
  }, [materials]);

  return (
    <div className="w-full min-h-dvh flex flex-col bg-paper-texture font-sora relative overflow-x-clip">
      <AccountHeader userName={userName} />

      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col">
        {loading ? (
          <>
            <section className="w-full bg-hero" aria-busy="true">
              <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-[calc(var(--header-h)+2.25rem)] pb-20 sm:pt-[calc(var(--header-h)+3rem)] sm:pb-24 lg:pt-[calc(var(--header-h)+3.5rem)] lg:pb-28">
                <div className="flex flex-col gap-5 max-w-3xl">
                  <div className="h-4 w-40 rounded-full skeleton-shimmer-dark" />
                  <div className="h-12 w-full max-w-xl rounded-2xl skeleton-shimmer-dark" />
                  <div className="h-4 w-3/4 max-w-md rounded-full skeleton-shimmer-dark" />
                  <div className="pt-5 mt-1 border-t border-white/[0.08] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div className="h-10 w-24 rounded-xl skeleton-shimmer-dark" />
                      <div className="h-10 w-24 rounded-xl skeleton-shimmer-dark" />
                    </div>
                    <div className="h-11 w-40 rounded-2xl skeleton-shimmer-dark" />
                  </div>
                </div>
              </div>
            </section>

            <div className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 mt-6 sm:mt-10 mb-14 flex flex-col gap-6">
              <div className="h-7 w-48 rounded-full skeleton-shimmer" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <SkeletonPurchasedCard key={i} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <AccountWelcome
              totalMateriais={materials.length}
              studentCount={counts.student}
              teacherCount={counts.teacher}
              userName={userName}
            />

            <div className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 mt-6 sm:mt-10 mb-14 flex flex-col gap-8">
              <MaterialSection materials={materials} loading={materialsLoading} />

              <div className="flex justify-center border-t border-borda pt-8">
                <BackVitrine tone="light" />
              </div>
            </div>
          </>
        )}
      </main>

      <SiteFooter className="mt-0" />
    </div>
  );
}
