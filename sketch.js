import domtoimage from 'dom-to-image/dist/dom-to-image.min.js';
let gridSize = 16;
const container = document.querySelector('.grid');
const colourPicker = document.querySelector('#color');


function grid(){

    for (let i = 0; i< gridSize*gridSize; i++){
        let newDiv = document.createElement('div');
        container.appendChild(newDiv).classList.add('grid-item');

        const gridItem = document.querySelectorAll('.grid-item')[i];
        gridItem.style.height = (600/gridSize)+"px";
        gridItem.style.width = (600/gridSize)+"px";

        document.querySelector('.info').textContent = gridSize +" x "+gridSize;

        gridItem.addEventListener('click', function(e){
            this.style.background = colourPicker.value;
        });

        gridItem.addEventListener('mousemove',function (e){
            //left mouse button for drawing
            if (e.buttons ==1){
                this.style.background = colourPicker.value;
            }
            //right mouse button for erasing
            if (e.buttons ==2){
                this.style.background = '#ffffff40'
            }
        });
    };
};
grid();

let resize = document.getElementById('resize');
resize.addEventListener('click',function (e){
    container.innerHTML="";
    gridSize= parseInt(prompt('Please insert grid size (less than 62): '))
    if (gridSize < 62 && gridSize >0){
    grid();
    }
    else {
        alert('Grid size capped at 61.');
        gridSize = 61;
        grid();
    }

    
});

let reset = document.getElementById('reset');
reset.addEventListener('click', function(e){
    if (confirm('Are you sure? ')){
        while(container.firstChild){
            container.removeChild(container.firstChild);
        };
        grid();
        
    };
});

let save = document.getElementById('save_btn');
save.addEventListener('click',function(){
domtoimage.toJpeg(document.getElementById('sketch'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'Sketch.jpeg';
        link.href = dataUrl;
        link.click();
    });

});
