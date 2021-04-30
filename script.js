        const arr=[]
        
        var container = document.getElementById("display");
        
        function generatearray(arr=[80,20,50,60,40,80,70]) {
            container.innerHTML=''
            //console.log(`${arr.length} is arr`)
	    for (var i = 0; i < arr.length; i++) {
		// Return a value from 1 to 100 (both inclusive)
		var value =arr[i];

		// Creating element div
		var array_ele = document.createElement("div");

		// Adding class 'block' to div
		array_ele.classList.add("block");
        let mf=10
        let max=Math.max(...arr)
        console.log(max)
        if(max<100){
            mf=10
        }
        else if(max>100 && max<300){
            mf=mf/2
        }else if(max>300 && max<500){
            mf=mf/5
        }else if(max>500 && max<1000){
            mf=mf/10
        }else{
            mf=mf/20
        }
		// Adding style to div
		array_ele.style.width = `${value * mf}px`;
		array_ele.style.transform = `translate(0,${i * 30}px)`;

		// Creating label element for displaying
		// size of particular block
		var array_ele_label = document.createElement("label");
		array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;
		// Appending created elements to index.html
        array_ele.appendChild(array_ele_label);
		container.appendChild(array_ele);
	    }
        }
        generatearray(arr);
    function swap(el1, el2) {
	    return new Promise((resolve) => {

		// For exchanging styles of two blocks
		var temp = el1.style.transform;
		el1.style.transform = el2.style.transform;
		el2.style.transform = temp;

		window.requestAnimationFrame(function() {

			// For waiting for .25 sec
			setTimeout(() => {
				container.insertBefore(el2, el1);
				resolve();
			}, 250);
		});
	    });
    }
async function InsertionSort(delay=100){
    var blocks=document.querySelectorAll(".block")
    let n=blocks.length
    for(let i=1;i<n;i++){
        //choosing form 1st element
        let j=i-1
        let key=(blocks[i].childNodes[0].innerHTML)
        let width=blocks[i].style.width
        blocks[i].style.backgroundColor="#13CE66";
        await new Promise((resolve)=>setTimeout(()=>{
            resolve()
        },delay))
        while((j>-1) && (parseInt(blocks[j].childNodes[0].innerHTML)>key)){
            blocks[j].style.backgroundColor="#FF4949";
            blocks[j+1].style.width=blocks[j].style.width
            blocks[j+1].childNodes[0].innerText=blocks[j].childNodes[0].innerText
            j--
        
            await new Promise((resolve)=>setTimeout(()=>{
                resolve()
            },delay))
            for(let k=i;k>=0;k--){
                blocks[k].style.backgroundColor="#13CE66";
            }
        }
        blocks[j+1].style.width=width
        blocks[j+1].childNodes[0].innerHTML=key
        await new Promise((resolve)=>setTimeout(()=>{
                resolve()
            },delay))
    }
    blocks.forEach((b)=>{
        console.log(b.childNodes[0].innerHTML)
    })
}

// Asynchronous BubbleSort function
async function BubbleSort(delay = 100) {
	var blocks = document.querySelectorAll(".block");

	// BubbleSort Algorithm
	for (var i = 0; i < blocks.length; i += 1) {
		for (var j = 0; j < blocks.length - i - 1; j += 1) {

			// To change background-color of the
			// blocks to be compared
			blocks[j].style.backgroundColor = "#FF4949";
			blocks[j + 1].style.backgroundColor = "#FF4949";

			// To wait for .1 sec
			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, delay)
			);

			console.log("run");
			var value1 = Number(blocks[j].childNodes[0].innerHTML);
			var value2 = Number(blocks[j + 1]
						.childNodes[0].innerHTML);

			// To compare value of two blocks
			if (value1 > value2) {
				await swap(blocks[j], blocks[j + 1]);
				blocks = document.querySelectorAll(".block");
			}

			// Changing the color to the previous one
			blocks[j].style.backgroundColor = "#6b5b95";
			blocks[j + 1].style.backgroundColor = "#6b5b95";
		}

		    //changing the color of greatest element
		    //found in the above traversal  
		    blocks[blocks.length - i - 1]
				.style.backgroundColor = "#13CE66";
	}
}
async function lometo_partition(l,r,delay=100){
    let blocks=document.querySelectorAll(".block")
    let pivot=Number(blocks[r].childNodes[0].innerHTML)
    var i=l-1
    blocks[r].style.backgroundColor="#6b5b95"//red;
    for(var j=l;j<=r-1;j++){
        blocks[j].style.backgroundColor="yellow";
        await new Promise((resolve)=>
            setTimeout(()=>{
                resolve()
            },delay)
        )
    
        var value=Number(blocks[j].childNodes[0].innerHTML)
        if(value<pivot){
        i++
        var temp1=blocks[i].style.width
        var temp2=blocks[i].childNodes[0].innerText
        blocks[i].style.width=blocks[j].style.width
        blocks[j].style.width=temp1
        blocks[i].childNodes[0].innerText=blocks[j].childNodes[0].innerText
        blocks[j].childNodes[0].innerText=temp2
        blocks[i].style.backgroundColor="orange"
        if(i!=j){
            blocks[j].style.backgroundColor="pink"
        }
        await new Promise((resolve)=>
            setTimeout(()=>{
                resolve()
            },delay)
        )
        }else{
        blocks[j].style.backgroundColor='pink'
        }
    }
    i++;
    var temp1=blocks[i].style.width
    var temp2=blocks[i].childNodes[0].innerText
    blocks[i].style.width=blocks[r].style.width
    blocks[r].style.width=temp1
    blocks[i].childNodes[0].innerText=blocks[r].childNodes[0].innerText
    blocks[r].childNodes[0].innerText=temp2
    blocks[r].style.backgroundColor="pink"
    blocks[i].style.backgroundColor="green"
    await new Promise((resolve)=>
            setTimeout(()=>{
                resolve()
            },delay*4)
        )
    for(let k=0;k<arr.length;k++){
        blocks[k].style.backgroundColor="#6b5b95"
    }
    return i
}
async function QuickSort(l,r,delay=100){
    if(l<r){
        var pivot=await lometo_partition(l,r)
        await QuickSort(l,pivot-1)
        await QuickSort(pivot+1,r)
    }
}

        document.querySelector("#add").addEventListener('click',function(){
            arr.push(document.querySelector('#ip').value)
            generatearray(arr);
        // renderNumber(arr)
        document.querySelector('#ip').value=''
        })
        //renderNumber(arr,0)
        document.querySelector('#generatearray').addEventListener('click',function(){
            for(let i=0;i<20;i++){
              let num=Number(Math.round(Math.random()*100))
                arr.push(num)
            }
            generatearray(arr)
        })
        document.querySelector('#BubbleSort').addEventListener('click',function(){
            BubbleSort()
        })
        document.querySelector('#InsertionSort').addEventListener('click',function(){
            InsertionSort(delay=200)
        })
        document.querySelector('#QuickSort').addEventListener('click',function(){
            QuickSort(0,arr.length-1,delay=700)
        })        
        document.querySelector('#reset').addEventListener('click',function(){
            generatearray(arr);
            //renderNumber(arr)
        })
       