// A Merge Sort Algorithm

const mergeSort = (arr) => {
    if (arr.length === 0) return [];
    if (arr.length === 1) return arr
    else {
        const mid = Math.ceil(arr.length/2);
        const leftArray = arr.slice(0,mid);
        const rightArray = arr.slice(mid);

        return merge(mergeSort(leftArray),mergeSort(rightArray));
    }
}

const merge = (leftArray,rightArray) => {
    let left = 0;
    let right = 0;
    let res = [];
    
    while (left < leftArray.length && right < rightArray.length) {
        if (leftArray[left] < rightArray[right]) {
            res.push(leftArray[left]);
            left++;
        }
        else {
            res.push(rightArray[right]);
            right++;
        }

    }
    res = res.concat(leftArray.slice(left));
    res = res.concat(rightArray.slice(right));

    return res;
}

export {mergeSort};