#include <iostream>
#include <bits/stdc++.h>

using namespace std;

struct TreeNode
{                                      // TreeNode is used to store all information (i.e. parent, locked, locked by which id, children, locked descendents)
    string name;                       // name of the node
    int lockedBy;                      // store locked by which id
    bool isLocked;                     // is node locked or not
    vector<TreeNode *> childs;         // store all childeren or current node
    TreeNode *parent;                  // parent of current node
    set<TreeNode *> lockedDescendents; // store node pointer of locked descendents

    TreeNode(string nm, TreeNode *par)
    { // constructor to create node by passing node's name and partner node pointer. if
        // current node is root node of tree than parent of root will be NULL
        name = nm;
        lockedBy = -1; // Initially we are assuming current node is not locked by any id (-1 means not locked by any id)
        parent = par;
        isLocked = false; // node is unlocked
    }

    void addChild(vector<string> &a)
    { // create all the childs of current node
        for (string &nm : a)
        {
            childs.push_back(new TreeNode(nm, this));
        }
    }
};

struct MAryTree
{
    TreeNode *root;                                          // root of the tree
    unordered_map<string, TreeNode *> nameToTreeNodeMapping; // store node name and node pointer mapping
    MAryTree(string name)
    { // constructor of M-Ary-Tree
        root = new TreeNode(name, nullptr);
    }

    void makeMArtTree(vector<string> &a, int m)
    {                        // this method is used to build the tree (Initially).
        queue<TreeNode *> q; // using queue to iterate all node like bfs approach
        int k = 1, i, n = a.size();

        q.push(root); // push root node initially
        while (!q.empty())
        { // iterate node (pop node) and push all its childs in the queue.
            TreeNode *r = q.front();
            q.pop();
            nameToTreeNodeMapping[r->name] = r;
            vector<string> b;
            for (i = k; i < min(n, k + m); i++)
            {
                b.push_back(a[i]);
            }
            r->addChild(b);

            for (TreeNode *child : r->childs)
            { // insert all its childs ( of recently poped node) in the queue
                q.push(child);
            }
            k = i;
        }
    }

    void print(TreeNode *r)
    { // method is used to print tree (for debug perpose).
        if (!r)
            return;
        cout << "TreeNode -> " << r->name << " " << r->lockedBy << " " << "\n";
        cout << "Childs -> \n";
        for (TreeNode *child : r->childs)
        {
            cout << "       " << child->name << "\n";
        }
        cout << "Locked -> \n";
        for (TreeNode *child : r->lockedDescendents)
        {
            cout << "       " << child->name << "\n";
        }
        for (TreeNode *child : r->childs)
        {
            print(child);
        }
    }
    void updateParents(TreeNode *r, TreeNode *curr)
    {
        // inform all ancestor about its child locking in O(logN base M)
        while (r)
        {
            r->lockedDescendents.insert(curr);
            r = r->parent;
        }
    }

    bool lock(string name, int id)
    {                                              // method is required to lock the node which is given in problem statement
        TreeNode *r = nameToTreeNodeMapping[name]; // fetch the node pointer using its name
        if (r->isLocked || r->lockedDescendents.size())
            return false; // check if node is already locked and have any locked ancestor than return false (if any condition become true)

        TreeNode *par = r->parent;
        while (par)
        { // check if any ancestor is locked or not (by any id) if yes than we can't lock current node
            if (par->isLocked)
                return false;
            par = par->parent;
        }
        updateParents(r->parent, r); // inform all ancestor about its locking in O(logm(n) time)
        r->isLocked = true;          // lock the node
        r->lockedBy = id;
        return true;
    }

    bool unlock(string name, int id)
    {
        TreeNode *r = nameToTreeNodeMapping[name];
        if (!r->isLocked || r->lockedBy != id)
            return false; // return false if node is unlocked or locked by different id

        TreeNode *par = r->parent;
        while (par)
        { // inform all Ancestors about its unlocking
            par->lockedDescendents.erase(r);
            par = par->parent;
        }
        r->isLocked = false; // unlock it
        r->lockedBy = -1;
        return true;
    }

    bool upgradeLock(string name, int id)
    {
        TreeNode *r = nameToTreeNodeMapping[name];
        if (r->isLocked || r->lockedDescendents.size() == 0)
            return false; // return false if node is already locked or have 0 locked descendants

        for (TreeNode *ld : r->lockedDescendents)
        { // check all the descendants are locked by same id or not
            if (ld->lockedBy != id)
                return false;
        }
        TreeNode *par = r->parent;
        while (par)
        { // check if any ancestor is locked or not
            if (par->isLocked)
                return false;
            par = par->parent;
        }

        set<TreeNode *> stt = r->lockedDescendents;
        for (TreeNode *ld : stt)
        { // unlock all descendants
            unlock(ld->name, id);
        }
        lock(name, id); // lock current node
        return true;
    }
};

int main()
{
    int n, m, t, i, opType, id;
    string name;
    cin >> n >> m >> t;
    vector<string> a(n);
    for (i = 0; i < n; i++)
    {
        cin >> a[i];
    }

    MAryTree *tree = new MAryTree(a[0]);
    tree->makeMArtTree(a, m);
    // tree->print(tree->root);

    while (t--)
    {
        cin >> opType >> name >> id;

        if (opType == 1)
        {
            if (tree->lock(name, id))
            {
                cout << "true";
            }
            else
                cout << "false";
        }
        else if (opType == 2)
        {
            if (tree->unlock(name, id))
            {
                cout << "true";
            }
            else
                cout << "false";
        }
        else if (opType == 3)
        {
            if (tree->upgradeLock(name, id))
            {
                cout << "true";
            }
            else
                cout << "false";
        }
        cout << "\n";
    }
}