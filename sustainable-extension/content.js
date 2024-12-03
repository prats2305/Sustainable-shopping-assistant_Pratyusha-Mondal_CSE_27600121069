document.addEventListener('DOMContentLoaded', () => {
    const productTitle = document.querySelector("h1"); // Example for Amazon product pages
    const description = document.querySelector("#productDescription");

    if (productTitle && description) {
        chrome.runtime.sendMessage({
            action: "extract_product",
            data: {
                name: productTitle.innerText.trim(),
                description: description.innerText.trim()
            }
        });
    }
});
