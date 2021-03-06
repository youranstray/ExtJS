
	Ext.onReady(function () {
			//Hello World
			//Ext.MessageBox.alert('helloword', 'Hello World.');

			//Class Person self-define event
			Person = function (name) {
				this.name = name;
				this.addEvents("walk", "eat", "sleep");
			};
			Ext.extend(Person, Ext.util.Observable, {
				info: function (event) {
					return this.name + 'is' + event + 'ing.';
				}
			});
			var person = new Person('Lingo');
			person.on('walk', function () {
				Ext.Msg.alert('event', person.name + " is walking.");
			});
			person.on('eat', function (breakfast, lunch, supper){
				Ext.Msg.alert('event', person.name + " is going to eating " + breakfast + ", " + lunch + " and " + supper + ".");
			});
			person.on('sleep', function (time) {
				Ext.Msg.alert('event', person.name + " is time to sleep at " + time.format("H") + ":00.");
			});
			Ext.get('walk').on('click', function () {
				person.fireEvent('walk');
			});
			Ext.get('eat').on('click', function () {
				person.fireEvent('eat', 'breakfast', 'lunch', 'super');
			});
			Ext.get('sleep').on('click', function () {
				person.fireEvent('sleep', new Date());
			});

			//browser event
			Ext.lib.Event;

			//self-define event Ext.util.Observable
			
			var fn = function (e, el, args) {
				//alert("handle");
				console.log(e);
				console.log(el);
				console.log(args);
				//alert(args.testId);
			};

			Ext.get('test').on('click', fn, this, {
				buffer: 1000,
				testId: 4
			});

			Ext.get('capture1').on('click', function () {
				Ext.util.Observable.capture(person, function (){

					alert('capture1');
					return true;
				});
			});

			Ext.get('capture2').on('click', function () {
				Ext.util.Observable.capture(person, function (){
					alert('capture2');
					return false;
				});
			});

			Ext.get('text').on('keypress', function (e) {
				if(e.charCode == Ext.EventObject.SPACE) {
					Ext.Msg.alert('info', 'space');
					console.log(Ext.EventObject);
					console.log(e.charCode);
				}
			});

			Ext.get(document.body).on('mousewheel', function (e) {
				var delta = e.getWheelDelta();
				var test = Ext.get('test1');
				var width = test.getWidth();
				test.setWidth(width + delta * 500, true);
			});

			//Ext.BoxComponent
			var box = new Ext.BoxComponent({
				/*el: 'test1',
				style:'background-color:red; position:absolute;',
				pageX:100,
				pageY:50,
				width:200,
				height:150*/
			});
			// box.render();
			
			// Ext.Panel
			var panel = new Ext.Panel({
				el: 'test1',
				title: 'test title',
				floating: true,
				shawdow: true,
				draggable: true,
				collapsoble: true,
				html: 'test content',
				/*pageX: 100,
				pageY: 50,*/
				width: 200,
				height: 150
			});
			panel.render();

			//Ext.TabPanel
			var tabs = new Ext.TabPanel({
				renderTo:document.body,
				height:100
			});
			tabs.add({
				id: Ext.id(),
				title: 'title1',
				html:'content1',
				closable:true
			});
			tabs.add({
				id: Ext.id(),
				title: 'title2',
				html: 'content2',
				closable:true
			});
			tabs.activate(0);

			/*var tab = tabs.add({
				title: 'grid' + id,
				closable: true,
				layout: 'fit',
				items: [grid]
			});
			tabs.activate(tab);*/

			//Grid
			
			Ext.data.Store.prototype.applySort = function () {
				if (this.sortInfo && !this.remoteSort) {
					var s = this.sortInfo, f = s.field;
					var st = this.fields.get(f).sortType;
					var fn = function (r1, r2) {
						var v1 = st(r1.data[f]),
							v2 = st(r2.data[f]);
							if (typeof(v1) == "string") {
								return v1.localeCompare(v2);
							}
							return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
					};
					this.data.sort(s.direction, fn);
					if (this.snapshot && this.snapshot != this.data) {
						this.snapshot.sort(s.direction, fn);
					}
				}
			};

			var sm = new Ext.grid.CheckboxSelectionModel();
			var cm = new Ext.grid.ColumnModel([
				new Ext.grid.RowNumberer(),
				sm,
				{
					header:'id',
					dataIndex:'id',
					sortable:true,
					editor: new Ext.grid.GridEditor(
						new Ext.form.TextField({allowBlank: false
						})
					),
				},
				{
					header:'name',
					dataIndex:'name',
					sortable:true,
					editor: new Ext.grid.GridEditor(
						new Ext.form.TextField({allowBlank: false
						})
					),
				},
				{
					id:'descn',
					header:'describle',
					dataIndex:'descn',
					editor: new Ext.grid.GridEditor(
						new Ext.form.TextField({allowBlank: false
						})
					),
				}
			]);
			var data = [
				['1', '啊', 'descn1'],
				['2', '啵', 'descn2'],
				['3', '呲', 'descn3'],
				['4', '嘚', 'descn4'],
				['5', '咯', 'descn5']
			];
			var store = new Ext.data.Store({
				proxy: new Ext.data.MemoryProxy(data),
				// proxy: new Ext.data.HttpProxy({url: 'data'}),
				reader: new Ext.data.ArrayReader({}, [
					{name: 'id'},
					{name: 'name'},
					{name: 'descn'}
				]),
				/*reader: new Ext.data.JsonReader({
					totalProperty: 'totalProperty',
					root: 'root'
				},[
					{name: 'id'},
					{name: 'name'},
					{name: 'descn'}
				]),*/
				sortInfo:{
					field:"name",
					direction:"ASC"
				}
			});

			// var grid = new Ext.grid.EditorGridPanel({
			var grid = new Ext.grid.GridPanel({
				renderTo: 'grid',
				stripeRows: true,
				enableColumnMove: false,
				enableColumnResize: false,
				store: store,
				cm: cm,
				sm: sm,//new Ext.grid.RowSelectionModel({singleSelect:true}),
				height: 180,
				
				viewConfig: {
					forceFit: true,
					columnsText: '显示的列',
					scrollOffset: 16,
					sortAscText: '升序',
					sortDescText: '降序',
				},
				autoExpandColumn: 'descn',
				bbar: new Ext.PagingToolbar({
					pageSize: 10,
					store: store,
					displayInfo: true,
					displayMsg: '显示第{0}条到{1}',
					empty: '没有记录'
				}),
				remoteSort: true,
			});
			store.load({params:{start:0,limit:10}});
			var contextmenu = new Ext.menu.Menu({
				id: 'thisContextMenu',
				items:[
					{
						text: '查看详情',
						handler: function () {

						},
					},
					{
						text: '修改',
						handler: function () {
							
						},
					}
				],
			});
			grid.on("rowcontextmenu", function (grid, rowIndex , e) {
				e.preventDefault();
				grid.getSelectionModel().selectRow(rowIndex);
				contextmenu.showAt(e.getXY());
			});
			/*grid.on('click', function () {
				var selections = grid.getSelectionModel().getSelections();
				for (var i = 0; i < selections.length; i++) {
					var record = selections[i];
					Ext.Msg.alert('Tip', record.get("id") + "," + record.get("name") + "," + record.get("descn"));
				}
			});*/

			Ext.get('test').on('click', function () {
				console.log(grid.getView());
			});

			//Form
			/*Ext.QuickTips.init();
			
			var form = new Ext.form.FormPanel({
				// defaultType: 'textfield',
				labelAlign: 'right',
				labelWidth: 50,
				width: 600,
				title: 'form',
				//buttonAlign: 'center',
				frame: true,
				items: [{
						// fieldLabel: '文本框'
						layout: 'column',
						items:[{
							columnWidth: .7,
							xtype: 'fieldset',
							checkboxToggle: true,
							title: '单纯输入',
							autoHeight: true,
							defaults: {width: 300},
							defaultType: 'textfield',
							items: [{
								fieldLabel: '文本',
								name: 'text'
							},{
								xtype: 'numberfield',
								fieldLabel: '数字',
								name: 'number'
							},{
								xtype: 'combo',
								fieldLabel: '选择',
								name: 'combo',
								store: new Ext.data.SimpleStore({
									fields: ['value', 'text'],
									data:[
										['value1', 'text1'],
										['value2', 'text2']
									]
								}),
								displayField: 'text',
								valueField: 'value',
								mode: 'local',
								emptyText: '请选择'
							},{
								xtype: 'datefield',
								fieldLabel: '日期',
								name: 'date'
							},{
								xtype: 'timefield',
								fieldLabel: '时间',
								name: 'date'
							},{
								xtype: 'textarea',
								fieldLabel: '多行',
								name: 'textarea'
							},{
								xtype: 'hidden',
								name:'hidden'
							}],
						},{
							columnWidth: 3,
							layout: 'form',
							items: [{
								xtype: 'fieldset',
								checkboxToggle: true,
								title: '多选',
								autoHeight: true,
								defaultType: 'checkbox',
								hideLabels: true,
								style: 'margin-left: 10px',
								bodyStyle: 'margin-left: 20px;',
								items:[{
									boxLabel: '首先要穿暖',
									name: 'check',
									value: '1',
									checked: true,
									width: 'auto'
								},{
									boxLabel: '然后要吃饭',
									name: 'check',
									value: '2',
									checked: true,
									width: 'auto'
								},{
									boxLabel: '房子遮风避雨',
									name:'check',
									value: '3',
									width: 'auto'
								},{
									boxLabel:'行路方便',
									name: 'check',
									value: '4',
									width: 'auto'
								}],
							},{
								xtype: 'fieldest',
								checkboxToggle: true,
								title: '单选',
								autoHeight: true,
								defaultType:'radio',
								hideLabels: true,
								style: 'margin-left: 10px;',
								items:[{
									boxLabel:'渴望自由',
									name: 'rad',
									value: '1',
									checked: true,
									width: 'auto'
								},{
									boxLabel:'祈求爱情',
									name: 'rad',
									value: '2',
									width: 'auto'
								}]
							}]
						}],
					},{
						layout: 'form',
						labelAlign: 'top',
						items:[{
							xtype: 'htmleditor',
							fieldLabel: '在线编辑器',
							id: 'editor',
							anchor: '98%'
						}]
					}],
				button:[{
						text: '保存'
					},{
						text: '读取'
					},{
						text: '取消'
					}],
			});
			form.render('form');*/

			Ext.QuickTips.init();

			var field1 = new Ext.form.Field({
				fieldLabel: 'qtip',
				msgTarget: 'qtip'
			});
			var field2 = new Ext.form.Field({
				fieldLabel: 'title',
				msgTarget: 'title'
			});
			var field3 = new Ext.form.Field({
				fieldLabel: 'side',
				msgTarget: 'side'
			});
			var field4 = new Ext.form.Field({
				fieldLabel: 'under',
				msgTarget: 'under'
			});

			var form = new Ext.form.FormPanel({
				title: 'form',
				frame: true,
				items: [field1, field2, field3, field4],
				renderTo: 'form'
			});
			field1.markInvalid();
			field2.markInvalid();
			field3.markInvalid();
			field4.markInvalid();

			//Ext.tree.TreaPanel
			//
			var  tree = new Ext.tree.TreePanel({
				el: 'tree'
			});
			var root = new Ext.tree.TreeNode({
				text:'Root'
			});
			tree.setRootNode(root);
			tree.render();

			var node1 = new Ext.tree.TreeNode({text:'first'});
			var node2 = new Ext.tree.TreeNode({text:'second'});
			var node3 = new Ext.tree.TreeNode({text:'third'});
			// node1.appendChild(node2);
			root.appendChild(node1);
			root.appendChild(node3);


			var tree1 = new Ext.tree.TreePanel({
				el: 'tree1',
				loader: new Ext.tree.TreeLoader({dataUrl: 'treeData'})
			});
			// tree1.render();

			var viewport = new Ext.Viewport({
				//BoderLayout
				/*layout: 'border',
				items: [
				{region: 'north', html: 'north', height: 120},
				{region: 'south', html: 'south', height: 30},
				{region: 'east', html: 'east', width: 40},
				{region: 'west', html: 'west', width:100},
				{region: 'center', html: 'center'}
				],*/
				//CardLayout
				layout:'border',
				items:[{
					region: 'west',
					id: 'wizard',
					width: 200,
					title: '某某向导',
					layout: 'card',
					activeItem: 0,
					bodyStyle: 'padding: 15px',
					defaults: {
						border: false
					},
					bbar: [{
						id: 'move-prev',
						text: '上一步',
						handler: navHandler.createDelegate(this, [-1]),
						disabled: true
					}, '->', {
						id: 'move-next',
						text: '下一步',
						handler: navHandler.createDelegate(this, [1]),
					}],
					items: [{
						id: 'card-0',
						html: '<h1>哈哈！<br />欢迎用咱的向导。</h1><p>第一步，共三步</p>'
					},{
						id: 'card-1',
						html: '<p>第二步，共三步</p>'
					},{
						id: 'card-2',
						html: '<h1>恭喜恭喜，完成了</h1><p>第三部，共三步</p>'
					}]
				},{
					region: 'center',
					split: true,
					border: true
				}]
			});
			var navHandler = function (direction){
				var wizard = Ext.getCmp('wizard').layout;
				var prev = Ext.getCmp('move-prev');
				var next = Ext.getCmp('move-next');
				var activeId = wizard.activeItem.id;

				if(activeId == 'card-0') {
					if (direction == 1){
						wizard.setActiveItem(1);
						prev.setDisable(false);
					}
				}else if (activeId == 'card-1'){
					if (diretion == -1) {
						wizard.setActiveItem(0);
						prev.setDisabled(true);
					}else {
						wizard.setActiveItem(2);
						next.setDisabled(true);
					}
				}else if (activeId == 'card-2'){
					if (direction == -1) {
						wizard.setActiveItem(1);
						next.setDisabled(false);
					}
				}
			}
	});