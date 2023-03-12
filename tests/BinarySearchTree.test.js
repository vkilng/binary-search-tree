import { BinarySearchTree } from "../BinarySearchTree";

const bst = BinarySearchTree([4, 7, 1, 2, 9, 3]);

test("Checks for LevelOrder traversal of BST", () => {
    expect(bst.levelOrder()).toEqual([4, 2, 9, 1, 3, 7])
})

test("Checks for Preorder traversal of BST", () => {
    expect(bst.preorder()).toEqual([4, 2, 1, 3, 9, 7])
})

test("Checks for Inorder traversal of BST", () => {
    expect(bst.inorder()).toEqual([1, 2, 3, 4, 7, 9])
})

test("Checks for Postorder traversal of BST", () => {
    expect(bst.postorder()).toEqual([1, 3, 2, 7, 9, 4])
})

test("Checks for height of BST", () => {
    expect(bst.height()).toBe(2)
})

test("Checks for depth of passed value in BST", () => {
    expect(bst.depth(4)).toBe(0);
    expect(bst.depth(2)).toBe(1);
    expect(bst.depth(9)).toBe(1);
    expect(bst.depth(1)).toBe(2);
    expect(bst.depth(3)).toBe(2);
    expect(bst.depth(7)).toBe(2);
})

test("Checks if BST contains data using find() and if returned value is corresponding node", () => {
    expect(bst.find(45)).toBe(null);
    expect(bst.find(1)).toEqual({ data: 1, leftChild: null, rightChild: null });
    expect(bst.find(9)).toEqual({ data: 9, leftChild: { data: 7, leftChild: null, rightChild: null }, rightChild: null });
})

test("Checks if BST is balanced", () => {
    expect(bst.isBalanced()).toBe(true)
})

test("Checks if insertNode() inserts passed numbers into BST", () => {
    //inserting [6,0,12,13,45,22,37]
    [6, 0, 12, 13, 45, 22, 37].forEach(num => bst.insertNode(num));
    expect(bst.levelOrder()).toEqual([
        4, 2, 9, 1, 3, 7,
        12, 0, 6, 13, 45, 22,
        37
    ]);
    expect(bst.preorder()).toEqual([
        4, 2, 1, 0, 3, 9,
        7, 6, 12, 13, 45, 22,
        37
    ]);
    expect(bst.inorder()).toEqual([
        0, 1, 2, 3, 4, 6,
        7, 9, 12, 13, 22, 37,
        45
    ]);
    expect(bst.postorder()).toEqual([
        0, 1, 3, 2, 6, 7,
        37, 22, 45, 13, 12, 9,
        4
    ]);
    expect(bst.height()).toBe(6);
    expect(bst.find(45)).toEqual({
        data: 45,
        leftChild: {
            data: 22,
            leftChild: null,
            rightChild: { data: 37, leftChild: null, rightChild: null }
        },
        rightChild: null
    });
    expect(bst.depth(45)).toBe(4);
    expect(bst.isBalanced()).toBe(false);
})

test("Checks rebalancing of the BST", () => {
    bst.rebalance();
    expect(bst.isBalanced()).toBe(true);
    expect(bst.height()).toBe(3);
    expect(bst.find(45)).toEqual({
        data: 45,
        leftChild: {
            data: 37, leftChild: null, rightChild: null
        },
        rightChild: null
    });
    expect(bst.depth(45)).toBe(2);
})