exports.createEnvironment = function(){
    var workerQueue, 
        workerGlobal = new org.mozilla.javascript.tools.shell.Global();
    javaWorkerGlobal = new org.mozilla.javascript.NativeJavaObject(global, workerGlobal, null);
    javaWorkerGlobal.init(org.mozilla.javascript.tools.shell.Main.shellContextFactory);
    workerGlobal.NARWHAL_HOME = system.prefix;
    workerGlobal.NARWHAL_ENGINE_HOME = system.prefix + '/engines/' + system.engine;
    // get the path to the bootstrap.js file
    var bootstrapPath = system.prefix + '/engines/' + system.engine + "/bootstrap.js";
    org.mozilla.javascript.tools.shell.Main.processFile(
        org.mozilla.javascript.Context.enter(), 
        workerGlobal,
        bootstrapPath);

    return workerGlobal;
};

exports.spawn = function(functionToRun, threadName){
    (new java.lang.Thread(function(){
       	var context = Packages.org.mozilla.javascript.Context.getCurrentContext();
       	// TODO: this needs call something that will do the context/thread preparation
        context.setOptimizationLevel(-1);
            
        context.setLanguageVersion(180);
      	context.getWrapFactory().setJavaPrimitiveWrap(false);
	
	functionToRun();
    }, threadName)).start();
};

