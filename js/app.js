class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    update (dt) {

        this.x += this.speed * dt;
    
        if (this.x > 550) {
            this.x = -100;
            this.speed = 100 + Math.floor(Math.random() * 512);
        }
    
        if (player.x < this.x + 60 &&
            player.x + 37 > this.x &&
            player.y < this.y + 25 &&
            30 + player.y > this.y) {
            player.x = 200;
            player.y = 300;
            
        }
    }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}


class Player {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/char-boy.png';
    }

    update () {
        if (this.y > 380) {
            this.y = 380;
        }
    
        if (this.x > 400) {
            this.x = 400;
        }
    
        if (this.x < 0) {
            this.x = 0;
        }
        
        if (this.y == -20) {
            if (!modalControl) {
                modal();   
            }
                
        }
    
    }

    reset () {
        this.x = 200;
        this.y = 300;   
        modalControl = false     
    }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput (keyPress) {
        switch (keyPress) {
            case 'left':
                this.x -= this.speed + 50;
                break;
            case 'up':
                this.y -= this.speed + 30;
                break;
            case 'right':
                this.x += this.speed + 50;
                break;
            case 'down':
                this.y += this.speed + 30;
                break;
        }
    }

}

let modalControl = false;

let allEnemies = [];

let enemyStartPosition = 60
for (let index = 0; index < 3; index++) {
    allEnemies.push(new Enemy(-80, enemyStartPosition, (100 + Math.floor(Math.random() * 512))));
    enemyStartPosition += 80;
}

const player = new Player(200, 300, 50);

const modal = function () {
    modalControl = true
    Swal.fire({
        title: 'Yeah!! You did! Congratulations! ',
        width: 600,
        padding: '3em',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
        confirmButtonText: 'Try Again',                
        backdrop: `
        rgba(0,0,123,0.4)
        url("https://sweetalert2.github.io/images/nyan-cat.gif")
        center left
        no-repeat
        `,
        onClose:  () => player.reset(), 
    })  
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});