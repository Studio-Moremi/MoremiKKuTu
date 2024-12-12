/**
* Rule the words! KKuTu Online
* Copyright (C) 2024~ Studio Moremi(op@kkutu.store)
**/
const clickSound1 = new Audio('../sound/click_1.mp3');
const clickSound2 = new Audio('../sound/click_1.mp3');

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) => {
        button.addEventListener('mousedown', () => {
            clickSound1.currentTime = 0;
            clickSound1.play();
        });

        button.addEventListener('mouseup', () => {
            clickSound2.currentTime = 0;
            clickSound2.play();
        });
    });
});
