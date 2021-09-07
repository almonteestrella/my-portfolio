// ********** Hero H1 typing effect ************
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}


// ********** date ************
const year = document.querySelector('#date')
year.textContent = new Date().getFullYear()

// ********** Close links ************
const closeNavBtn = document.querySelector('.closeNavBtn')
const linksContainer = document.querySelector('.links-container')
const links = document.querySelector('.links')

closeNavBtn.addEventListener('click', () => {
  const linksContainerHeight = linksContainer.getBoundingClientRect().height
 const linksHeight = links.getBoundingClientRect().height
 
 

 if (linksContainerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`
 } else {
   linksContainer.style.height = 0
 }
})

const navbar = document.getElementById('nav')
const topLink = document.querySelector('.top-link')

// ********** fixed navbar ************
window.addEventListener('scroll', () => {
  const scrollHeight = window.pageYOffset
  const navHeight = navbar.getBoundingClientRect().height

  if (scrollHeight > navHeight) {
      navbar.classList.add('fixed-nav')
  } else {
    navbar.classList.remove('fixed-nav')
  }

  if (scrollHeight > 600) {
    topLink.classList.add('show-link')
  } else {
    topLink.classList.remove('show-link')
  }
})

// ********** smooth scroll ************
const scrollLinks = document.querySelectorAll('.scroll-link')
scrollLinks.forEach((link) => {
 link.addEventListener('click', (e) => {
  e.preventDefault()

  //navegate to specific section
  const id = e.currentTarget.getAttribute('href').slice(1);
  const element = document.getElementById(id);

  // calculate the heights
  const navHeight = navbar.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const fixedNav = navbar.classList.contains('fixed-nav');

  let position = element.offsetTop - navHeight;

  if (!fixedNav) {
   position = position - navHeight
  }

  if (navHeight >  82) {
   position += containerHeight
  }
  
  window.scrollTo({
   left: 0, top: position
  });
  linksContainer.style.height = 0;

 })
})
