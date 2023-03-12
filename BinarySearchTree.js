import { mergeSort } from './MergeSort.js';
import { Queue } from './Queue.js';

const Node = (_data, _leftChild = null, _rightChild = null) => {
  const data = _data;
  const leftChild = _leftChild;
  const rightChild = _rightChild;

  return { data, leftChild, rightChild };
}

const BinarySearchTree = (_arr = []) => {
  _arr = mergeSort([...new Set(_arr)]); // Construction of a balanced BST starts with a SORTED array
  // console.log('Sorted Array: ', _arr);

  const buildBalancedBST = (arr = _arr) => {
    if (arr.length === 0) return null;

    const mid = parseInt(arr.length / 2);
    const root = Node(arr[mid]);
    root.leftChild = buildBalancedBST(arr.slice(0, mid));
    root.rightChild = buildBalancedBST(arr.slice(mid + 1));

    return root;
  }
  let rootNode = buildBalancedBST();

  const prettyPrint = (node = rootNode, prefix = '', isLeft = true) => {
    if (node === null) return null;
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  const insertNode = (data, root = rootNode) => {
    if (root === null) return (root = Node(data));

    if (data < root.data) root.leftChild = insertNode(data, root.leftChild);
    if (data > root.data) root.rightChild = insertNode(data, root.rightChild);

    return root;
  }

  const levelOrder = (func, root = rootNode, queue = Queue()) => {
    if (rootNode === null) return null;
    if (root.leftChild) queue.enqueue(root.leftChild);
    if (root.rightChild) queue.enqueue(root.rightChild);

    if (func === undefined) {
      if (queue.size() === 0 && root !== rootNode) return [root.data];
      return [root.data].concat(levelOrder(func, queue.dequeue(), queue));
    }

    func(root);
    if (queue.size() === 0 && root !== rootNode) return;
    return levelOrder(func, queue.dequeue(), queue);
  }

  const find = (data, root = rootNode, queue = Queue()) => {
    if (rootNode === null) return null;
    if (root.leftChild) queue.enqueue(root.leftChild);
    if (root.rightChild) queue.enqueue(root.rightChild);

    if (root.data === data) return root;
    if (queue.size() === 0 && root !== rootNode) return null;
    return find(data, queue.dequeue(), queue);
  }

  const preorder = (func, root = rootNode) => {
    // returns array if no function passed; else returns undefined
    if (func === undefined) {
      if (root === null) return [];
      return [root.data].concat(preorder(func, root.leftChild)).concat(preorder(func, root.rightChild));
    }

    if (root === null) return null;
    func(root);
    preorder(func, root.leftChild);
    preorder(func, root.rightChild);
  }
  const inorder = (func, root = rootNode) => {
    if (func === undefined) {
      if (root === null) return [];
      return inorder(func, root.leftChild).concat([root.data]).concat(inorder(func, root.rightChild));
    }

    if (root === null) return null;
    inorder(func, root.leftChild);
    func(root);
    inorder(func, root.rightChild);
  }
  const postorder = (func, root = rootNode) => {
    if (func === undefined) {
      if (root === null) return [];
      return postorder(func, root.leftChild).concat(postorder(func, root.rightChild)).concat([root.data]);
    }

    if (root === null) return null;
    postorder(func, root.leftChild);
    postorder(func, root.rightChild);
    func(root);
  }

  const height = (root = rootNode) => {
    if (root === null) return -1;
    return 1 + Math.max(height(root.leftChild), height(root.rightChild));
  }
  const depth = (data, root = { node: rootNode, level: 0 }, queue = Queue()) => {
    if (rootNode === null) return null;

    if (root.node.leftChild) queue.enqueue({ node: root.node.leftChild, level: root.level + 1 });
    if (root.node.rightChild) queue.enqueue({ node: root.node.rightChild, level: root.level + 1 });

    if (root.node.data === data) return root.level;
    if (queue.size() === 0 && root.node !== rootNode) return null;
    return depth(data, queue.dequeue(), queue);
  }

  const isBalanced = (root = rootNode) => {
    if (root === null) return true;
    const diff = Math.abs(height(root.leftChild) - height(root.rightChild));
    // console.log(`${root.data} diff: ${diff}`);
    if (diff > 1) return false;
    return isBalanced(root.leftChild) && isBalanced(root.rightChild);
  }

  const rebalance = () => { return (rootNode = buildBalancedBST(inorder())) }

  return {
    prettyPrint, insertNode, levelOrder, find, preorder, inorder, postorder,
    height, depth, isBalanced, rebalance
  };
}

export { BinarySearchTree };

// const arr = [4, 7, 1, 2, 9, 3];
// const bst = BinarySearchTree(arr);
// bst.prettyPrint();

// console.log('-> inserting [6,0,12,13,45,22,37]');
// [6, 0, 12, 13, 45, 22, 37].forEach(num => bst.insertNode(num));
// bst.prettyPrint();

// console.log('Current BST balanced? ', bst.isBalanced());
// console.log('LevelOrder: ', bst.levelOrder());
// console.log('PreOrder: ', bst.preorder());
// console.log('InOrder: ', bst.inorder());
// console.log('PostOrder: ', bst.postorder());
// console.log('Find 45 in bst: ', bst.find(45));
// console.log('Height of bst: ', bst.height());
// console.log('Depth of 45 in bst: ', bst.depth(45));

// bst.rebalance();
// console.log('-> rebalancing bst ...');
// bst.prettyPrint();
// console.log('Current BST balanced? ', bst.isBalanced());
// console.log('Height of bst: ', bst.height());
// console.log('Depth of 45 in bst: ', bst.depth(45));
