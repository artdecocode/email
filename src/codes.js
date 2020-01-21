/*
  *   邮件服务返回代码含义 Mail service return code Meaning
  *   500   格式错误，命令不可识别（此错误也包括命令行过长）format error, command unrecognized (This error also includes command line too long)
  *   501   参数格式错误 parameter format error
  *   502   命令不可实现 command can not be achieved
  *   503   错误的命令序列 Bad sequence of commands
  *   504   命令参数不可实现 command parameter can not be achieved
  *   211   系统状态或系统帮助响应 System status, or system help response
  *   214   帮助信息 help
  *   220   服务就绪 Services Ready
  *   221   服务关闭传输信道 Service closing transmission channel
  *   421   服务未就绪，关闭传输信道（当必须关闭时，此应答可以作为对任何命令的响应）service is not ready to close the transmission channel (when it is necessary to close, this response may be in response to any command)
  *   250   要求的邮件操作完成 requested mail action completed
  *   251   用户非本地，将转发向 non-local users will be forwarded to
  *   450   要求的邮件操作未完成，邮箱不可用（例如，邮箱忙）Mail the required operation 450 unfinished, mailbox unavailable (for example, mailbox busy)
  *   550   要求的邮件操作未完成，邮箱不可用（例如，邮箱未找到，或不可访问）Mail action not completed the required 550 mailbox unavailable (eg, mailbox not found, no access)
  *   451   放弃要求的操作；处理过程中出错 waiver operation; processing error
  *   551   用户非本地，请尝试 non-local user, please try
  *   452   系统存储不足，要求的操作未执行 Less than 452 storage system, requiring action not taken
  *   552   过量的存储分配，要求的操作未执行 excess storage allocation requires action not taken
  *   553   邮箱名不可用，要求的操作未执行（例如邮箱格式错误） mailbox name is not available, that the requested operation is not performed (for example, mailbox format error)
  *   354   开始邮件输入，以.结束 Start Mail input to. End
  *   554   操作失败  The operation failed
  *   535   用户验证失败 User authentication failed
  *   235   用户验证成功 user authentication is successful
  *   334   等待用户输入验证信息 waits for the user to enter authentication information
  */
