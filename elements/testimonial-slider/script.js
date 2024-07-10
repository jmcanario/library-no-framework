document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    centeredSlides: true,
  });

  const cards = document.querySelectorAll('.card');
  const commentElement = document.getElementById('web-design-comment');
  const nameElement = document.getElementById('testimonial-name');

  const comments = {
    card1: '“The redesign of our website has been a game-changer. Not only does it look fantastic, but the improved functionality has made it so much easier for our customers to find what they need.”',
    card2: '“Our user engagement has soared since we revamped our site. The user experience is now seamless, and we’ve received numerous compliments on the new design.”',
    card3: '“I love how our new website adapts perfectly to any device. Whether our clients are on a phone, tablet, or desktop, the experience is consistently great.”',
    card4: '“The typography choices in our new design are spot-on. The text is not only easier to read, but it also looks more professional and inviting.”',
    card5: '“We’ve had so many positive comments about the new color scheme. It really sets the mood for our brand and makes the site more inviting.”',
    card6: '“The consistency in the design elements across the site has given it a much more polished and cohesive look. Our brand identity is now stronger than ever.”',
    card7: '“The intuitive navigation has drastically improved the user experience. Our clients can now find exactly what they’re looking for without any hassle.”',
    card8: '“The visual hierarchy of our new site design makes it so much easier to understand what’s important. Our content is much more accessible and engaging.”'
  };

  const names = {
    card1: 'Emily Johnson',
    card2: 'John Smith',
    card3: 'Sarah Brown',
    card4: 'David Lee',
    card5: 'Linda Davis',
    card6: 'James Miller',
    card7: 'Michael Wilson',
    card8: 'Lisa Taylor'
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const cardId = card.id;
      commentElement.textContent = comments[cardId];
      nameElement.textContent = names[cardId];
    });

    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.id);
      setTimeout(() => {
        card.classList.add('hidden');
      }, 0);
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('hidden');
    });
  });

  const container = document.querySelector('.swiper-wrapper');

  container.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  container.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggable = document.getElementById(id);
    const afterElement = getDragAfterElement(container, e.clientX);
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
    swiper.update(); // Update Swiper after reordering
  });

  function getDragAfterElement(container, x) {
    const draggableElements = [...container.querySelectorAll('.card:not(.hidden)')];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.left - box.width / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
});
