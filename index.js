// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add('active'));
}, { threshold: 0.3 });

revealElements.forEach(el => observer.observe(el));

// Sidebar Interaction
const sidebarItems = document.querySelectorAll('#sidebar li[data-target]');
const sections = document.querySelectorAll('section');
function updateSidebar(target) {
    sidebarItems.forEach(li => li.classList.toggle('active', li.dataset.target === target));
}

window.addEventListener('scroll', () => {
    let current = 'landing';
    sections.forEach(sec => {
        if (pageYOffset >= sec.offsetTop - 50) current = sec.id;
    });
    updateSidebar(current);
});

sidebarItems.forEach(li => li.addEventListener('click', () => {
    const trg = li.dataset.target;
    document.getElementById(trg).scrollIntoView({ behavior: 'smooth' });
    if (trg === 'features') document.querySelector('#loc-tab').click();
    updateSidebar(trg);
}));

document.querySelectorAll('#featureTabs button').forEach(btn =>
    btn.addEventListener('shown.bs.tab', e => updateSidebar(e.target.getAttribute('data-bs-target').substring(1)))
);