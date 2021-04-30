
const arr=[]
        
        var container = document.getElementById("display");
  //1)Genrerate new array      
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
//2)Insertion sort 
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

//2) BubbleSort function
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
// 3) Quick sort.
async function lometo_partition(l,r,delay=100){
    let blocks=document.querySelectorAll(".block")
    let pivot=Number(blocks[r].childNodes[0].innerHTML)
    var i=l-1
    blocks[r].style.backgroundColor="#6b5b95"//red;
    if(l===r){
    blocks[r].style.backgroundColor="#FF4949"//red;
    }
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
        // if(i!=j){
        //     blocks[j].style.backgroundColor="pink"
        // }
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
    blocks[i].style.backgroundColor="#FF4949"
    await new Promise((resolve)=>
            setTimeout(()=>{
                resolve()
            },delay*4)
        )
    // for(let k=0;k<arr.length;k++){
    //     blocks[k].style.backgroundColor="#6b5b95"
    // }
    return i
}
async function QuickSort(l,r,delay=100){
    if(l<=r){
        var pivot=await lometo_partition(l,r,delay)
        await QuickSort(l,pivot-1,delay)
        await QuickSort(pivot+1,r,delay)
    }
}
// Asynchronous CountSort function

    const generate_freq=function(){
    var count=document.querySelector('#count')
    count.innerHTML=''
        var size=Math.max(...arr)//arr.length
        //console.log(`size of ${count} is ${size}`)
        for (var i=1;i<=size;i++){
            if(i===1){
                const arrayEl=document.createElement("div")
                arrayEl.classList.add('block2')
                arrayEl.style.width=`${100}px`
                arrayEl.style.transform=`translate ${i*30}px`
    
                const arrrayInd=document.createElement('label')
                arrrayInd.classList.add('block_id2')
                arrrayInd.innerText="key"
    
                const labelEl=document.createElement('label')
                labelEl.classList.add('block_id2')
                labelEl.innerText="freqency"
                
                arrayEl.appendChild(arrrayInd)
                arrayEl.appendChild(labelEl)
                arrayEl.innerHTML=arrayEl.innerHTML+'<br>'
                count.appendChild(arrayEl)
                count.innerHTML=count.innerHTML+`<br>`
                count.innerHTML=count.innerHTML+`<br>`
            }
            const arrayEl=document.createElement("div")
            arrayEl.classList.add('block2')
            arrayEl.style.width=`${100}px`
            arrayEl.style.transform=`translate ${i*30}px`

            const arrrayInd=document.createElement('label')
            arrrayInd.classList.add('block_id2')
            arrrayInd.innerText=i

            const labelEl=document.createElement('label')
            labelEl.classList.add('block_3')
            labelEl.innerText=0
            
            arrayEl.appendChild(arrrayInd)
            arrayEl.appendChild(labelEl)
            arrayEl.innerHTML=arrayEl.innerHTML+'<br>'
            count.appendChild(arrayEl)
            count.innerHTML=count.innerHTML+`<br><br>`
            count.innerHTML=count.innerHTML+``
        }
    }
    async function CountSort(delay = 100) {
        var blocks = document.querySelectorAll(".block");
        for(let i=0;i<blocks.length;i++){
            blocks[i].style.backgroundColor="#ff4949";
            const num=Number(blocks[i].childNodes[0].innerHTML)
            const freq=document.querySelectorAll('.block_3')
            console.log(`${(num)} ${freq.length}`)
            freq[num-1].innerText++
            await new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve()
                },delay)
            })
            blocks[i].style.backgroundColor="#6b5b95"
        }
         
  //Sorting by using frequency array
  var idx = 0;
  for (var i = 0; i <=blocks.length; i += 1) {
    var freq = document.getElementsByClassName("block_3");
  
    var temp = Number(freq[i].innerText);
  
    var freq_block = document.getElementsByClassName("block2");
  
    //changing color of freq block
    freq_block[i].style.backgroundColor = "#FF4949";

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      },  delay)
    );
  
    if (temp == 0) {
      //changing color of freq block to previous one
      freq_block[i].style.backgroundColor = "darkgray";
      continue;
    }
  
    var block_label = document.getElementsByClassName("block_id");
  
    //sorting the block array
    for (var j = 0; j < temp; j++) {
      blocks[idx].style.width = `${(i + 1) * 13}px`;
      block_label[idx].innerText = i + 1;
      blocks[idx].style.backgroundColor="#ff4949"
      idx++;
    }
  
    //changing color of freq block to previous one
    freq_block[i].style.backgroundColor = "darkgray";
  
    //To wait for .1 sec
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 2 * delay)
    );
  }
    }
    async function merge(left, right,delay=100) {
        let arr = []
        // Break out of loop if any one of the array gets empty
        while (left.length && right.length) {
            // Pick the smaller among the smallest element of left and right sub arrays 
            if (left[0] < right[0]) {
                arr.push(left.shift())  
                
            } else {
                arr.push(right.shift()) 
            }
        }
        
        // Concatenating the leftover elements
        // (in case we didn't go through the entire left or right array)
        return [ ...arr, ...left, ...right ]
    }
    async function mergeSort(array,delay=100) {
        const half = array.length / 2
        
        // Base case or terminating case
        if(array.length < 2){
          return array 
        }
        
        const left = array.splice(0, half)
        return merge(mergeSort(left),mergeSort(array))
      }
      async function ChangeButton(){
          const buttons=document.querySelectorAll("button")
          buttons.forEach((but)=>{
              console.log(but.disabled)
              if(but.disabled==true){
                  but.disabled=false
              }
              else{
                  but.disabled=true
              }
          })
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
              let num=Number(Math.round(Math.random()*20)+1)
                arr.push(num)
            }
            generatearray(arr)
            count.innerHTML=''

        })
        document.querySelector('#BubbleSort').addEventListener('click',function(){
            BubbleSort()
            count.innerHTML=''

        })
        document.querySelector('#InsertionSort').addEventListener('click',function(){
            ChangeButton()
            InsertionSort(delay=200)
            count.innerHTML=''
            ChangeButton()
        })
        document.querySelector('#QuickSort').addEventListener('click',function(){
            QuickSort(0,arr.length-1,200)
            count.innerHTML=''

        })
        document.querySelector('#CountSort').addEventListener('click',function(){
            generate_freq()
            CountSort(200)
        })        
        document.querySelector('#reset').addEventListener('click',function(){
            generatearray(arr);
                count.innerHTML=''

            //renderNumber(arr)
        })
       