export function tree(node,list){
	node.children = list.filter((l)=>l.parentid==node.id).map((n)=>{
		return tree(n,list);
	})
	return node;
}


