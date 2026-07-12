(() => {
  const language = document.documentElement.lang === "en" ? "en" : "cs";
  const reviewsData = window.ImmunaliaReviewsData?.products || {};
  const commerceData = window.ImmunaliaProductCommerceData || {};
  const labels = language === "en"
    ? { reviews: "reviews", review: "review" }
    : { reviews: "recenzí", review: "recenze" };

  const createStars = (rating) => {
    const stars = document.createElement("span");
    stars.className = "product-rating-stars";
    stars.textContent = "★★★★★";
    stars.style.setProperty("--rating-percent", `${Math.min(100, Math.max(0, rating / 5 * 100))}%`);
    stars.setAttribute("aria-label", `${rating.toFixed(1)} / 5`);
    return stars;
  };

  document.querySelectorAll("[data-product-price]").forEach((element) => {
    const productId = element.dataset.productPrice;
    element.textContent = commerceData[productId]?.price?.[language] || "";
  });

  document.querySelectorAll("[data-product-rating]").forEach((element) => {
    const productId = element.dataset.productRating;
    const product = reviewsData[productId];
    if (!product) return;

    const countLabel = product.reviewCount === 1 ? labels.review : labels.reviews;
    const value = document.createElement("strong");
    value.textContent = product.averageRating.toFixed(1);
    const count = document.createElement("span");
    count.className = "product-rating-count";
    count.textContent = `(${product.reviewCount} ${countLabel})`;
    element.replaceChildren(createStars(product.averageRating), value, count);
  });

  document.querySelectorAll("[data-product-review-list]").forEach((list) => {
    const productId = list.dataset.productReviewList;
    const reviews = reviewsData[productId]?.reviews || [];
    const fragment = document.createDocumentFragment();

    reviews.slice(0, 3).forEach((review) => {
      const article = document.createElement("article");
      article.className = "product-review-quote";

      const header = document.createElement("div");
      header.className = "product-review-quote-header";
      header.append(createStars(review.rating));
      const date = document.createElement("time");
      date.dateTime = review.date;
      date.textContent = new Intl.DateTimeFormat(language === "en" ? "en-GB" : "cs-CZ", {
        month: "short",
        year: "numeric"
      }).format(new Date(`${review.date}T00:00:00`));
      header.append(date);

      const quote = document.createElement("blockquote");
      quote.textContent = review.text[language];
      const author = document.createElement("strong");
      author.textContent = review.author;
      article.append(header, quote, author);
      fragment.append(article);
    });

    list.replaceChildren(fragment);
  });
})();
