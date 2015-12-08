Ext.onReady(function () {
	//menu
	var tb = new Ext.Toolbar();
	tb.render('toolbar');

	var menuHistory  = new Ext.menu.Menu({
		items:[
			{text: '今天'},
			{text: '昨天'},
			{text: '一周'},
			{text: '一月'},
			{text: '一年'}
		]
	});

	var menuFile = new Ext.menu.Menu({
		items: [
			{text: '新建'},
			{text: '打开'},
			{text: '保存'},
			{text: '另存...'},
			'-',
			{text: '历史', menu: menuHistory},
			'-',
			{text: '关闭'}
		]
	});

	var menuOperator = new Ext.menu.Menu({
		items: [
			{text: '增加'},
			{text: '删除'},
			{text: '修改'}
		]
	});

	tb.add({
		text: '文件',
		menu: menuFile
	},{
		text: '操作',
		menu: menuOperator
	});
	tb.doLayout();
});