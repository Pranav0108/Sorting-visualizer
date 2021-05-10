
const arr=[]
        
        var container = document.getElementById("display");
  //1)Genrerate new array      
        function generatearray(arr=arr,color='#6b5b95') {
            container.innerHTML=''
	    for (var i = 0; i < arr.length; i++) {
		var value =arr[i];
		// Creating element div
		var array_ele = document.createElement("div");
		// Adding class 'block' to div
		array_ele.classList.add("block");
        let mf=10
        let max=Math.max(...arr)
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
        array_ele.style.backgroundColor=color
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
        blocks[i].style.backgroundColor="#orange";
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
                blocks[k].style.backgroundColor="orange";
            }
        }
        blocks[j+1].style.width=width
        blocks[j+1].childNodes[0].innerHTML=key
        await new Promise((resolve)=>setTimeout(()=>{
                resolve()
            },delay))
    }
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
				.style.backgroundColor = "orange";
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
//wait in merge sort
      function res() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('resolved');
          }, 600);
        });
      }
     function min(x,y) { return (x<y)? x :y; }
        /* Iterative mergesort function to sort arr[0...n-1] */
        async function mergeSort(arr,n,tim)
        {
           var curr_size;  // For current size of subarrays to be merged
                           // curr_size varies from 1 to n/2
           var left_start; // For picking starting index of left subarray
           for (curr_size=1; curr_size<=n-1; curr_size = 2*curr_size)
           {
            // sleep(200)
            // generatearray(arr)
               for (left_start=0; left_start<n-1; left_start += 2*curr_size)
               {
                   var mid = min(left_start + curr_size - 1, n-1);
         
                   var right_end = min(left_start + 2*curr_size - 1, n-1);
         
                   // Merge Subarrays arr[left_start...mid] & arr[mid+1...right_end]
                   merge(arr, left_start, mid, right_end,tim)
               }
               const ke=await res()
               generatearray(arr,);
           }
           const ke=await res()
               generatearray(arr,'orange');
           return
        }
        
        /* Function to merge the two haves arr[l..m] and arr[m+1..r] of array arr[] */
       async function merge( arr,l,m,r,tim)
        {
            var i, j, k;
            var n1 = m - l + 1;
            var n2 =  r - m;
            /* create temp arrays */
            var L=[0], R=[0];
            for(let i=0;i<n1;i++){
                L.push(0)
            }
            for(let i=0;i<n2;i++){
                R.push(0)
            }
            /* Copy data to temp arrays L[] and R[] */
            for (i = 0; i < n1; i++)
                L[i] = arr[l + i];
            for (j = 0; j < n2; j++)
                R[j] = arr[m + 1+ j];
            /* Merge the temp arrays back into arr[l..r]*/
            i = 0;
            j = 0;
            k = l;
            while (i < n1 && j < n2)
            {
                if (L[i] <= R[j])
                {
                    arr[k] = L[i];
                    i++;
                }
                else
                {
                    arr[k] = R[j];
                    j++;
                }
                k++;
                tim=tim+2000
                // const  ke1=await res()
                // generatearray(arr);
            }
         
            /* Copy the remaining elements of L[], if there are any */
            while (i < n1)
            {
                arr[k] = L[i];
                i++;
                k++;
                // const  ke1=await res()
                // generatearray(arr);
            }
         
            /* Copy the remaining elements of R[], if there are any */
            while (j < n2)
            {
                arr[k] = R[j];
                j++;
                k++;
                // const  ke1=await res()
                // generatearray(arr);
            }
            // generatearray(arr)
            const  ke1=await res()
            generatearray(arr,'orange');
            const abc=ke1            
        }
        
//code display
        const less='&#x3c'
        const large='&#x3e'
        const space='&nbsp&nbsp&nbsp&nbsp                             '
      const bubbleC=function(){
        document.getElementById('code').style.display="block"
        document.querySelector("#C").innerHTML=`
          void BubbleSort(int arr,int size)<br>for(int i=0;i${less};size;i++){<br>
            ${space}for(int j=0;j${less}size-i-1;j++){<br>
            ${space}${space}if(j[i]${large}j[i+1]){<br>
            ${space}${space}${space}int temp=j[i];<br>
            ${space}${space}${space}j[i]=j[i+1];<br>
            ${space}${space}${space}j[i+1]=temp;<br>
            ${space}${space}}<br>
            ${space}}<br>
            }<br>
        `
        document.querySelector("#java").innerHTML=`static void bubbleSort(int[] arr) {<br>  
            ${space}int n = arr.length;  <br>
            ${space}int temp = 0;  <br>
            ${space}for(int i=0; i ${less} n; i++){  <br>
            ${space}${space}for(int j=1; j ${less} (n-i); j++){<br>  
            ${space}${space}${space}if(arr[j-1] ${large} arr[j]){  <br>
            ${space}${space}${space}${space}//swap elements  <br>
            ${space}${space}${space}${space}temp = arr[j-1];  <br>
            ${space}${space}${space}${space}arr[j-1] = arr[j];  <br>
            ${space}${space}${space}${space}arr[j] = temp;  <br>
            ${space}${space}${space}}  <br>
            ${space}${space}}  <br>
            ${space}}  <br>
          `
        document.querySelector("#python").innerHTML=`def bubbleSort(arr):<br>
            ${space}n = len(arr)<br>
            ${space}for i in range(n-1):<br>
            ${space}${space}for j in range(0, n-i-1):<br>
            ${space}${space}${space}if arr[j] > arr[j+1] :<br>
            ${space}${space}${space}${space}arr[j], arr[j+1] = arr[j+1], arr[j]<br>
          `
      }
      const InsertionC=function(){
        document.getElementById('code').style.display="block"
        document.querySelector("#C").innerHTML=`
        void insertionSort(int arr[], int n){<br>
        ${space}int i, key, j;<br>
        ${space}for (i = 1; i i${less} n; i++){<br>
        ${space}${space}key = arr[i];<br>
        ${space}${space}j = i - 1;<br>
        ${space}${space}while (j i${large}= 0 && arr[j] ${large} key){<br>
        ${space}${space}${space}arr[j + 1] = arr[j];<br>
        ${space}${space}${space}j = j - 1;<br>
        ${space}${space}}<br>
        ${space}${space}${space}arr[j + 1] = key;<br>
        ${space}}<br>
        }<br>
      `
        document.querySelector("#java").innerHTML=`
        void InsertionSort(int arr[]){<br>
        ${space}int n = arr.length;<br>
        ${space}for (int i = 1; i ${less} n; ++i) {<br>
            ${space}${space}int key = arr[i];<br>
            ${space}${space}int j = i - 1;<br>
            ${space}${space}while (j ${large}= 0 && arr[j] ${large} key) {<br>
                ${space}${space}${space}arr[j + 1] = arr[j];<br>
                ${space}${space}${space}j = j - 1;<br>
            ${space}${space}}<br>
            ${space}arr[j + 1] = key;<br>
            ${space}}<br>
        }<br>
        `
        document.querySelector("#python").innerHTML=`
        def insertionSort(arr):<br>
        ${space}for i in range(1, len(arr)):<br>
        ${space}${space}key = arr[i]<br>
        ${space}${space}j = i-1<br>
        ${space}${space}while j >= 0 and key < arr[j] :<br>
        ${space}${space}${space}arr[j + 1] = arr[j]<br>
        ${space}${space}${space}j -= 1<br>
        ${space}${space}arr[j + 1] = key<br>
        `
    }
    const quickC=function(){
        document.getElementById('code').style.display="block"
        document.querySelector("#C").innerHTML=`
        void swap(int* a, int* b){<br>
        ${space}int t = *a;<br>
        ${space}*a = *b;<br>
        ${space}*b = t;<br>
        }<br>
        int partition (int arr[], int low, int high){<br>
        ${space}int pivot = arr[high]; // pivot<br>
        ${space}int i = (low - 1); <br>
        ${space}for (int j = low; j ${large}= high - 1; j++){<br>
        ${space}${space}if (arr[j] ${large} pivot){<br>
        ${space}${space}${space}i++;<br>
        ${space}${space}${space}swap(&arr[i], &arr[j]);<br>
        ${space}${space}}<br>
        ${space}}<br>
        ${space}swap(&arr[i + 1], &arr[high]);<br>
        ${space}return (i + 1);<br>
        }<br>
        void quickSort(int arr[], int low, int high){<br>
        ${space}if (low ${large} high){<br>
        ${space}${space}int pi = partition(arr, low, high);<br>
        ${space}${space}quickSort(arr, low, pi - 1);<br>
        ${space}${space}quickSort(arr, pi + 1, high);<br>
        ${space}}<br>
        }<br>
      `
        document.querySelector("#java").innerHTML=`
        static void swap(int[] arr, int i, int j){<br>
        ${space}int temp = arr[i];<br>
        ${space}arr[i] = arr[j];<br>
        ${space}arr[j] = temp;<br>
        }<br>
        static int partition(int[] arr, int low, int high){<br>
        ${space}int pivot = arr[high];<br>
        ${space}int i = (low - 1);<br>
        ${space}for(int j = low; j ${large}= high - 1; j++){<br>
        ${space}${space}if (arr[j] < pivot){<br>
        ${space}${space}${space}i++;<br>
        ${space}${space}${space}swap(arr, i, j);<br>
        ${space}${space}}<br>
        ${space}}<br>
        ${space}swap(arr, i + 1, high);<br>
        ${space}return (i + 1);<br>
        }<br>
        static void quickSort(int[] arr, int low, int high){<br>
        ${space}if (low < high){<br>
        ${space}${space}int pi = partition(arr, low, high);<br>
        ${space}${space}quickSort(arr, low, pi - 1);<br>
        ${space}${space}quickSort(arr, pi + 1, high);<br>
        ${space}}<br>
        }<br>
        `
        document.querySelector("#python").innerHTML=`
        def partition(start, end, array):<br>
        ${space}pivot_index = start<br>
        ${space}pivot = array[pivot_index]<br>
        ${space}while start < end:<br>
        ${space}${space}while start < len(array) and array[start] <= pivot:<br>
        ${space}${space}${space}start += 1<br>
        ${space}${space}while array[end] > pivot:<br>
        ${space}${space}${space}end -= 1<br>
        ${space}${space}if(start < end):<br>
        ${space}${space}${space}array[start], array[end] = array[end], array[start]<br>
        ${space}array[end], array[pivot_index] = array[pivot_index], array[end]<br>
        ${space}return end<br>
        def quick_sort(start, end, array):<br>
        ${space}if (start < end):<br>
        ${space}${space}p = partition(start, end, array)<br>
        ${space}${space}quick_sort(start, p - 1, array)<br>
        ${space}${space}quick_sort(p + 1, end, array)<br> 
        `
    }
    const countC=function(){
        document.getElementById('code').style.display="block"
        document.querySelector("#C").innerHTML=`
        void countSort(char arr[]){<br>
        ${space}int count[max(arr) + 1], i;<br>
        ${space}memset(count, 0, sizeof(count));<br>
        ${space}for (i = 0; arr[i]; ++i)<br>
        ${space}${space}++count[arr[i]];<br>
        ${space}for (i = 1; i ${large}= RANGE; ++i)<br>
        ${space}${space}count[i] += count[i - 1];<br>
        ${space}for (i = 0; arr[i]; ++i) {<br>
        ${space}${space} output[count[arr[i]] - 1] = arr[i];<br>
        ${space}${space}--count[arr[i]];<br>
        ${space}}<br>
        ${space}for (i = sizeof(arr)-1; i${less}=0; --i){<br>
        ${space}${space}output[count[arr[i]]-1] = arr[i];<br>
        ${space}${space}--count[arr[i]];<br>
        ${space}}<br>
        ${space}for (i = 0; arr[i]; ++i)<br>
        ${space}${space}arr[i] = output[i];<br>
        }<br>
      `
        document.querySelector("#java").innerHTML=`
        void sort(char arr[]){<br>
        ${space}int n = arr.length;<br>
        ${space}char output[] = new char[n];<br>
        ${space}int count[] = new int[max(arr)];<br>
        ${space}for (int i = 0; i ${less} max(arr); ++i)<br>
        ${space}${space}count[i] = 0;<br>
        ${space}for (int i = 0; i ${less} n; ++i)<br>
        ${space}${space}++count[arr[i]];<br>
        ${space}for (int i = 1; i ${less}max(arr); ++i)<br>
        ${space}${space}count[i] += count[i - 1];<br>
        ${space}for (int i = n - 1; i ${large}= 0; i--) {<br>
        ${space}${space}output[count[arr[i]] - 1] = arr[i];<br>
        ${space}${space}--count[arr[i]];<br>
        ${space}}<br>
        ${space}for (int i = 0; i ${less} n; ++i)<br>
        ${space}arr[i] = output[i];<br>
    }<br>
        `
        document.querySelector("#python").innerHTML=`
        def countSort(arr):<br>
        ${space}    output = [0 for i in range(len(arr))]<br>
        ${space}count = [0 for i in range(max(arr))]<br>
        ${space}ans = ["" for _ in arr]<br>
        ${space}for i in arr:<br>
        ${space}${space}count[ord(i)] += 1<br>
        ${space}for i in range(max(arr)):<br>
        ${space}${space}count[i] += count[i-1]<br>
        ${space}for i in range(len(arr)):<br>
        ${space}${space}output[count[ord(arr[i])]-1] = arr[i]<br>
        ${space}${space}count[ord(arr[i])] -= 1<br>
        ${space}for i in range(len(arr)):<br>
        ${space}${space}ans[i] = output[i]<br>
        ${space}return ans<br>
        `
    }
    const MergeC=function(){
        document.getElementById('code').style.display="block"
        document.querySelector("#C").innerHTML=`
    void merge(int arr[], int l, int m, int r){<br>
	${space}int i, j, k;<br>
    ${space}int n1 = m - l + 1;<br>
    ${space}int n2 = r - m;<br>
    ${space}for (i = 0; i < n1; i++)<br>
    ${space}${space}L[i] = arr[l + i];<br>
    ${space}for (j = 0; j < n2; j++)<br>
    ${space}${space}R[j] = arr[m + 1 + j];<br>
    ${space}${space}i = 0; // Initial index of first subarray<br>
    ${space}${space}j = 0; // Initial index of second subarray<br>
    ${space}${space}k = l; // Initial index of merged subarray<br>
    ${space}${space}while (i < n1 && j < n2) {<br>
    ${space}${space}${space}if (L[i] <= R[j]) {<br>
    ${space}${space}${space}${space}arr[k] = L[i];<br>
	${space}${space}${space}${space}i++;<br>
    ${space}${space}${space}}<br>
    ${space}${space}${space}else {<br>
    ${space}${space}${space}${space}arr[k] = R[j];<br>
    ${space}${space}${space}${space}j++;<br>
    ${space}${space}${space}}<br>
	${space}${space}k++;<br>
	${space}}    <br>
    ${space}/* Copy the remaining elements of L[], if there are any */<br>
    ${space}while (i < n1) {<br>
    ${space}${space}arr[k] = L[i];<br>
    ${space}${space}i++;<br>
    ${space}${space}k++;<br>
	${space}}<br>
    <br>
    ${space}	/* Copy the remaining elements of R[], if thereare any */<br>
    ${space}while (j < n2) {<br>
    ${space}${space}arr[k] = R[j];<br>
    ${space}${space}j++;<br>
    ${space}${space}k++;<br>
    ${space}}<br>
    }<br>

    void mergeSort(int arr[], int l, int r){<br>
        ${space}    if (l < r) {<br>
		    ${space}${space}// Same as (l+r)/2, but avoids overflow for<br>
		    ${space}${space}// large l and h<br>
		    ${space}${space}int m = l + (r - l) / 2;<br>
		    ${space}${space}// Sort first and second halves<br>
		    ${space}${space}mergeSort(arr, l, m);<br>
		    ${space}${space}mergeSort(arr, m + 1, r);<br>
		    ${space}${space}merge(arr, l, m, r);<br>
            ${space}}<br>
    }<br>
      `
        document.querySelector("#java").innerHTML=`
	void merge(int arr[], int l, int m, int r){<br>
    ${space}// Find sizes of two subarrays to be merged<br>
    ${space}int n1 = m - l + 1;<br>
    ${space}int n2 = r - m;<br>
    ${space}/* Create temp arrays */<br>
    ${space}int L[] = new int[n1];<br>
    ${space}int R[] = new int[n2];<br>
    ${space}/*Copy data to temp arrays*/<br>
    ${space}for (int i = 0; i < n1; ++i)<br>
    ${space}${space}L[i] = arr[l + i];<br>
    ${space}for (int j = 0; j < n2; ++j)<br>
    ${space}${space}R[j] = arr[m + 1 + j];<br>
    ${space}/* Merge the temp arrays */<br>
    ${space}// Initial indexes of first and second subarrays<br>
    ${space}int i = 0, j = 0;<br>
    ${space}// Initial index of merged subarry array<br>
    ${space}int k = l;<br>
    ${space}while (i < n1 && j < n2) {<br>
	${space}${space}if (L[i] <= R[j]) {<br>
    ${space}${space}${space}arr[k] = L[i];<br>
	${space}${space}${space}i++;<br>
    ${space}${space}}<br>
    ${space}${space}else {<br>
    ${space}${space}${space}arr[k] = R[j];<br>
    ${space}${space}${space}j++;<br>
    ${space}${space}}<br>
    ${space}k++;<br>
	${space}}<br>
	${space}/* Copy remaining elements of L[] if any */<br>
    ${space}while (i < n1) {<br>
	${space}${space}arr[k] = L[i];<br>
    ${space}${space}i++;<br>
    ${space}${space}k++;<br>
    ${space}}<br>
    ${space}/* Copy remaining elements of R[] if any */<br>
    ${space}while (j < n2) {<br>
	${space}${space}arr[k] = R[j];<br>
    ${space}${space}j++;<br>
    ${space}${space}k++;<br>
    ${space}}<br>
	}<br>
	// Main function that sorts arr[l..r] using<br>
	// merge()<br>
	void sort(int arr[], int l, int r){<br>
    ${space}if (l < r) {<br>
	${space}${space}// Find the middle point<br>
	${space}${space}int m =l+ (r-l)/2;<br>
	${space}${space}// Sort first and second halves<br>
    ${space}${space}sort(arr, l, m);<br>
    ${space}${space}sort(arr, m + 1, r);<br>
    ${space}${space}// Merge the sorted halves<br>
    ${space}${space}merge(arr, l, m, r);<br>
    ${space}}<br>
	}<br>
        `
        document.querySelector("#python").innerHTML=`
        # Python program for implementation of MergeSort<br>
        def mergeSort(arr):<br>
        ${space}if len(arr) > 1:<br>
        ${space}${space}# Finding the mid of the array<br>
        ${space}${space}mid = len(arr)//2<br>
        ${space}${space}# Dividing the array elements<br>
        ${space}${space}L = arr[:mid]<br>
        ${space}${space}# into 2 halves<br>
        ${space}${space}R = arr[mid:]<br>
        ${space}${space}# Sorting the first half<br>
        ${space}${space}mergeSort(L)<br>
        ${space}${space}# Sorting the second half<br>
        ${space}${space}mergeSort(R)<br>
        ${space}${space}i = j = k = 0<br>
        ${space}${space}# Copy data to temp arrays L[] and R[]<br>
        ${space}${space}while i < len(L) and j < len(R):<br>
        ${space}${space}${space}if L[i] < R[j]:<br>
        ${space}${space}${space}${space}arr[k] = L[i]<br>
        ${space}${space}${space}${space}i += 1<br>
        ${space}${space}${space}else:<br>
        ${space}${space}${space}${space}arr[k] = R[j]<br>
        ${space}${space}${space}${space}j += 1<br>
        ${space}${space}${space}k += 1<br>
        ${space}${space}# Checking if any element was left<br>
        ${space}${space}while i < len(L):<br>
        ${space}${space}${space}arr[k] = L[i]<br>
        ${space}${space}${space}i += 1<br>
        ${space}${space}${space}k += 1<br>
        ${space}${space}while j < len(R):<br>
        ${space}${space}${space}arr[k] = R[j]<br>
        ${space}${space}${space}j += 1<br>
        ${space}${space}${space}k += 1<br>
        `
    }
        document.querySelector("#add").addEventListener('click',function(){
            var num=document.querySelector('#ip').value
            if(num>0){
            arr.push(num)
            generatearray(arr);
            }
        // renderNumber(arr)
        document.querySelector('#ip').value=''
        })
        document.getElementById("ip").addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                document.querySelector("#add").click()
                console.log('added')
            }
        });
        //renderNumber(arr,0)
        document.getElementById('code').style.display="none"

        document.querySelector('#generatearray').addEventListener('click',function(){
            for(let i=0;i<50;i++){
              let num=Number(Math.round(Math.random()*20)+1)
                arr.push(num)
            }
            generatearray(arr)
            count.innerHTML=''

        })
        document.querySelector('#BubbleSort').addEventListener('click',function(){
            BubbleSort()
            count.innerHTML=''
            bubbleC()
        })
        document.querySelector('#InsertionSort').addEventListener('click',function(){
            InsertionC()
            InsertionSort(delay=200)
            count.innerHTML=''
        })
        document.querySelector('#QuickSort').addEventListener('click',function(){
            QuickSort(0,arr.length-1,200)
            count.innerHTML=''
            quickC()
        })
        document.querySelector('#CountSort').addEventListener('click',function(){
            generate_freq()
            CountSort(200)
            countC()
        })
        document.querySelector('#MergeSort').addEventListener('click',function(){
            count.innerHTML=''
            k=[]
            for(let i=0;i<arr.length;i++){
                k.push(arr[i])
            }
            mergeSort(k,k.length,1000)
            MergeC()

        })        
        document.querySelector('#reset').addEventListener('click',function(){
            generatearray(arr);
                count.innerHTML=''        
                document.getElementById('code').style.display="none"
            //renderNumber(arr)
        })
        function Clipboard_CopyTo(value) {
            var tempInput = document.createElement("input");
            tempInput.value = value;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
          }
          
          document.querySelector('#copyC').onclick = function() {
            Clipboard_CopyTo(document.querySelector("#C").innerText);
            var c=document.querySelector("#copyC")
            c.title="copied"
          }
          document.querySelector('#copyJ').onclick = function() {
            Clipboard_CopyTo(document.querySelector("#java").innerText);
            var c=document.querySelector("#copyJ")
            c.title="copied"
          }
          document.querySelector('#copyP').onclick = function() {
            Clipboard_CopyTo(document.querySelector("#python").innerText);
            var c=document.querySelector("#copyP")
            c.title="copied"
          }
          $(document).ready(function(){
            $("#copyC").click(function(){
              $("[data-toggle='tooltip1']").tooltip('show');
            });
            $("#copyJ").click(function(){
                $("[data-toggle='tooltip2']").tooltip('show');
              });
              $("#copyP").click(function(){
                $("[data-toggle='tooltip3']").tooltip('show');
              });
          });