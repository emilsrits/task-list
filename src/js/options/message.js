export default (id, message) => {
    const CLASS_VISIBLE = 'is-visible';

    const status = document.getElementById(id);

    status.classList.add(CLASS_VISIBLE);
    status.textContent = message;

    setTimeout(() => {
        status.textContent = '';
        status.classList.remove(CLASS_VISIBLE);
    }, 2000);
};