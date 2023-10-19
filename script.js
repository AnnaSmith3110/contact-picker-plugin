document.addEventListener('DOMContentLoaded', function() {
    fetch('contacts.json')
        .then(response => response.json())
        .then(data => {
            populateContacts(data);
            populateAlphabeticalIndex(data);
            setupSearchFunctionality();
        });
    const toggleHeader = document.getElementById('toggleHeader');
    const searchInput = document.getElementById('searchInput');
    const searchBar = document.querySelector('.search-bar');
    const contactsDiv = document.querySelector('.contacts');
    const alphabeticalIndex = document.querySelector('.alphabetical-index');
    const content = document.querySelector('.content');
    const icon = document.getElementById('arrowIcon');

    toggleHeader.addEventListener('click', function() {
        contactsDiv.classList.toggle('accordion-expanded');
        alphabeticalIndex.classList.toggle('accordion-expanded');

        if (contactsDiv.classList.contains('accordion-expanded')) {
            searchInput.style.display = "block"; 
            content.style.height = "80vh";
            searchBar.style.display = "flex"
            icon.classList.remove('fa-angle-down');
            icon.classList.add('fa-angle-up');
        } else {
            searchInput.style.display = "none";
            content.style.height = "0vh";
            searchBar.style.display = "none"
            icon.classList.remove('fa-angle-up');
            icon.classList.add('fa-angle-down');
        }
    });
});


function populateContacts(contacts) {
    const contactDiv = document.querySelector('.contacts');
    let currentLetter = '';
    let currentSection;

    sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name))
    sortedContacts.forEach(contact => {
        const firstLetter = contact.name.charAt(0).toUpperCase();

        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;

            currentSection = document.createElement('div');
            currentSection.className = 'contact-section';
            currentSection.setAttribute('data-letter', currentLetter);

            const header = document.createElement('h2');
            header.textContent = currentLetter;
            currentSection.appendChild(header);

            const list = document.createElement('ul');
            currentSection.appendChild(list);

            contactDiv.appendChild(currentSection);
        }

        const listItem = document.createElement('li');
        listItem.setAttribute('data-name', contact.name);
        listItem.textContent = contact.name;
        currentSection.querySelector('ul').appendChild(listItem);
    });
}

function populateAlphabeticalIndex(contacts) {
    const uniqueLetters = new Set();
    contacts.forEach(contact => {
        uniqueLetters.add(contact.name.charAt(0).toUpperCase());
    });
    
    const alphabeticalIndex = document.querySelector('.alphabetical-index ul');

    uniqueLetters.forEach(letter => {
        const listItem = document.createElement('li');
        listItem.textContent = letter;
        listItem.addEventListener('click', () => {
            const section = document.querySelector(`.contact-section[data-letter="${letter}"]`);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
        alphabeticalIndex.appendChild(listItem);
    });
}


function setupSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const contactSections = document.querySelectorAll('.contact-section');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();

        contactSections.forEach(section => {
            let hasVisibleContacts = false;

            const contacts = section.querySelectorAll('li');
            contacts.forEach(contact => {
                if (contact.getAttribute('data-name').toLowerCase().includes(searchTerm)) {
                    contact.style.display = 'block';
                    hasVisibleContacts = true;
                } else {
                    contact.style.display = 'none';
                }
            });

            section.style.display = hasVisibleContacts ? 'block' : 'none';
        });
    });
}


