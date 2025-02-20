function redirectToPage(selectElement) {
    const value = selectElement.value;
    if (value) {
        window.location.href = value;
    }
}