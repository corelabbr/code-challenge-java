package com.corelab.springboot.domain.enums;

public enum Authorize {
	
	ROLE_USER_POST(1, "ROLE_USER_POST"),
	ROLE_USER_PUT(2, "ROLE_USER_PUT"),
	ROLE_USER_DELETE(3, "ROLE_USER_DELETE"),
	ROLE_USER_GET(4, "ROLE_USER_GET"),
	ROLE_TASK_POST(5, "ROLE_TASK_POST"),
	ROLE_TASK_PUT(6, "ROLE_TASK_PUT"),
	ROLE_TASK_DELETE(7, "ROLE_TASK_DELETE"),
	ROLE_TASK_GET(8, "ROLE_TASK_GET"),
	ROLE_USER_MASTER(9, "ROLE_USER_MASTER");

	private int cod;
	private String description;
	
	private Authorize(int cod, String description) {
		this.cod = cod;
		this.description = description;
	}

	public int getCod() {
		return cod;
	}

	public String getDescription() {
		return description;
	}
	
	public static Authorize toEnum(Integer cod) {
		if(cod == null) {
			return null;
		}
		
		for (Authorize x : Authorize.values()) {
			if(cod.equals(x.getCod())) {
				return x;
			}
		}
		
		throw new IllegalArgumentException("Id not found: " + cod);
	}

	public static Authorize toEnum(String description) {
		if(description == null) {
			return null;
		}

		for (Authorize x : Authorize.values()) {
			if(description.equals(x.getDescription())) {
				return x;
			}
		}

		throw new IllegalArgumentException("Description not found: " + description);
	}
}
