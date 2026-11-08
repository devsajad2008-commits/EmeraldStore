type PageSkeletonProps = {
  label?: string;
  layout?: "catalog" | "cart";
};

export function PageSkeleton({
  label = "در حال بارگذاری صفحه",
  layout = "catalog",
}: PageSkeletonProps) {
  return (
    <div className={`container page-skeleton page-skeleton-${layout}`} role="status" aria-label={label} aria-busy="true">
      <span className="sr-only">{label}</span>
      <div className="skeleton-heading" aria-hidden="true">
        <span className="skeleton skeleton-kicker" />
        <span className="skeleton skeleton-title" />
        <span className="skeleton skeleton-description" />
      </div>
      {layout === "cart" ? (
        <div className="skeleton-cart" aria-hidden="true">
          <div className="skeleton-cart-lines">
            {[0, 1, 2].map((item) => (
              <div className="skeleton-cart-line" key={item}>
                <span className="skeleton skeleton-image" />
                <span className="skeleton-cart-copy">
                  <span className="skeleton skeleton-line" />
                  <span className="skeleton skeleton-line skeleton-line-short" />
                </span>
                <span className="skeleton skeleton-price" />
              </div>
            ))}
          </div>
          <div className="skeleton skeleton-summary" />
        </div>
      ) : (
        <div className="skeleton-catalog" aria-hidden="true">
          <div className="skeleton skeleton-filters" />
          <div className="skeleton-product-grid">
            {[0, 1, 2, 3].map((item) => (
              <div className="skeleton-product" key={item}>
                <span className="skeleton skeleton-product-image" />
                <span className="skeleton skeleton-line" />
                <span className="skeleton skeleton-line skeleton-line-short" />
                <span className="skeleton skeleton-line skeleton-line-price" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
