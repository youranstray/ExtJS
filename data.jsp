<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String start = request.getParamater("start");
	String limit = request.getParamater("limit");
	try{
		int index = Integer.parseInt(start);
		int pageSize = Integer.parseInt(limit);

		String json = "{totalProperty:100,root:[";
		for (int i = inde; i < pageSize + index; i++){
			json += "{id:" + i + ",name:'name" + i + "',descn:'descn" + i + "'}";
			if (i != pageSize + index -1) {
				json += ",";
			}
		}
		json += "]}";
		response.getWriter().write(json);
	}catch (Exception ex) {
		
	}
%>