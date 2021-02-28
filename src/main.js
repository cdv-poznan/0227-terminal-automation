import Push from 'push.js';

[1, 2].forEach((index) => {
  document
    .getElementById(`click${index}-btn`)
    .addEventListener('click', async ($event) => {
      const title = $event.target.innerText;
      const notification = await Push.create(title, {
        body: 'Button has been clicked',
        timeout: 4000,
        onClick: () => {
          window.focus();
        },
      });
      console.log(notification);
    });
});
