class Node {
  constructor(value, color = 'red', left = null, right = null, parent = null) {
    this.value = value;
    this.color = color;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
}

class RBT_all_methods {
  constructor() {
    this.TNULL = new Node(null, 'black');
    this.root = this.TNULL;
  }

  leftRotate(x) {
    const y = x.right;
    x.right = y.left;
    if (y.left !== this.TNULL) {
      y.left.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
    y.left = x;
    x.parent = y;
  }

  rightRotate(x) {
    const y = x.left;
    x.left = y.right;
    if (y.right !== this.TNULL) {
      y.right.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.right) {
      x.parent.right = y;
    } else {
      x.parent.left = y;
    }
    y.right = x;
    x.parent = y;
  }

  insert(value) {
    let node = new Node(value);
    node.left = this.TNULL;
    node.right = this.TNULL;

    let y = null;
    let x = this.root;

    while (x !== this.TNULL) {
      y = x;
      if (node.value < x.value) {
        x = x.left;
      } else {
        x = x.right;
      }
    }

    node.parent = y;
    if (y === null) {
      this.root = node;
    } else if (node.value < y.value) {
      y.left = node;
    } else {
      y.right = node;
    }

    node.color = 'red';
    this.insertFix(node);
  }

  insertFix(node) {
    while (node.parent && node.parent.color === 'red') {
      if (node.parent === node.parent.parent.left) {
        let uncle = node.parent.parent.right;
        if (uncle && uncle.color === 'red') {
          uncle.color = 'black';
          node.parent.color = 'black';
          node.parent.parent.color = 'red';
          node = node.parent.parent;
        } else {
          if (node === node.parent.right) {
            node = node.parent;
            this.leftRotate(node);
          }
          node.parent.color = 'black';
          node.parent.parent.color = 'red';
          this.rightRotate(node.parent.parent);
        }
      } else {
        let uncle = node.parent.parent.left;
        if (uncle && uncle.color === 'red') {
          uncle.color = 'black';
          node.parent.color = 'black';
          node.parent.parent.color = 'red';
          node = node.parent.parent;
        } else {
          if (node === node.parent.left) {
            node = node.parent;
            this.rightRotate(node);
          }
          node.parent.color = 'black';
          node.parent.parent.color = 'red';
          this.leftRotate(node.parent.parent);
        }
      }
    }
    this.root.color = 'black';
  }

  delete(value) {
    this.deleteNodeHelper(this.root, value);
  }

  deleteNodeHelper(node, key) {
    let z = this.TNULL;
    let x, y;
    while (node !== this.TNULL) {
      if (node.value === key) {
        z = node;
      }
      if (node.value <= key) {
        node = node.right;
      } else {
        node = node.left;
      }
    }

    if (z === this.TNULL) {
      console.log("Couldn't find key in the tree");
      return;
    }

    y = z;
    let yOriginalColor = y.color;
    if (z.left === this.TNULL) {
      x = z.right;
      this.rbTransplant(z, z.right);
    } else if (z.right === this.TNULL) {
      x = z.left;
      this.rbTransplant(z, z.left);
    } else {
      // Замість пошуку мінімуму у правому піддереві
      // шукаємо максимум у лівому піддереві
      y = this.maximum(z.left);
      yOriginalColor = y.color;
      x = y.left;
      if (y.parent === z) {
        x.parent = y;
      } else {
        this.rbTransplant(y, y.left);
        y.left = z.left;
        y.left.parent = y;
      }

      this.rbTransplant(z, y);
      y.right = z.right;
      y.right.parent = y;
      y.color = z.color;
    }
    if (yOriginalColor === 'black') {
      this.deleteFix(x);
    }
  }

  rbTransplant(u, v) {
    if (u.parent === null) {
      this.root = v;
    } else if (u === u.parent.left) {
      u.parent.left = v;
    } else {
      u.parent.right = v;
    }
    v.parent = u.parent;
  }

  deleteFix(x) {
    while (x !== this.root && x.color === 'black') {
      if (x === x.parent.left) {
        let w = x.parent.right;
        if (w.color === 'red') {
          w.color = 'black';
          x.parent.color = 'red';
          this.leftRotate(x.parent);
          w = x.parent.right;
        }

        if (w.left.color === 'black' && w.right.color === 'black') {
          w.color = 'red';
          x = x.parent;
        } else {
          if (w.right.color === 'black') {
            w.left.color = 'black';
            w.color = 'red';
            this.rightRotate(w);
            w = x.parent.right;
          }

          w.color = x.parent.color;
          x.parent.color = 'black';
          w.right.color = 'black';
          this.leftRotate(x.parent);
          x = this.root;
        }
      } else {
        let w = x.parent.left;
        if (w.color === 'red') {
          w.color = 'black';
          x.parent.color = 'red';
          this.rightRotate(x.parent);
          w = x.parent.left;
        }

        if (w.right.color === 'black' && w.left.color === 'black') {
          w.color = 'red';
          x = x.parent;
        } else {
          if (w.left.color === 'black') {
            w.right.color = 'black';
            w.color = 'red';
            this.leftRotate(w);
            w = x.parent.left;
          }

          w.color = x.parent.color;
          x.parent.color = 'black';
          w.left.color = 'black';
          this.rightRotate(x.parent);
          x = this.root;
        }
      }
    }
    x.color = 'black';
  }

  // Додано метод пошуку максимуму у піддереві
  maximum(node) {
    while (node.right !== this.TNULL) {
      node = node.right;
    }
    return node;
  }


  search(value) {
    let node = this.root;
    const path = [];

    while (node !== this.TNULL) {
      path.push(node.value);
      if (node.value === value) {
        return path;
      } else if (value < node.value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    return null; 
  }

  visualize() {
    const nodes = [];
    const links = [];

    const traverse = (node, depth = 0, pos = 0, offset = 100) => {
      if (node === this.TNULL || !node) return;

      nodes.push({
        id: node.value,
        color: node.color,
        depth,
        pos,
      });

      if (node.left !== this.TNULL) {
        links.push({ source: node.value, target: node.left.value });
        traverse(node.left, depth + 1, pos - offset, offset / 2);
      }

      if (node.right !== this.TNULL) {
        links.push({ source: node.value, target: node.right.value });
        traverse(node.right, depth + 1, pos + offset, offset / 2);
      }
    };

    traverse(this.root);
    return { nodes, links };
  }
}

export { RBT_all_methods };

