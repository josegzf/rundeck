package com.dtolabs.rundeck.core.authorization.providers;

import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;

import com.dtolabs.rundeck.core.authorization.Explanation;
import com.dtolabs.rundeck.core.authorization.Explanation.Code;

public class ContextDecision implements Explanation {
    
    private final Code id;
    private final boolean granted;
    private final List<ContextEvaluation> evaluations;
    
    public ContextDecision(Code id, boolean granted, List<ContextEvaluation> evaluations) {
        this.id = id;
        this.granted = granted;
        this.evaluations = evaluations;
    }
    
    public ContextDecision(Code id, boolean granted) {
        this(id, granted, new ArrayList<ContextEvaluation>());
    }
    
    public boolean granted() {
        return this.granted;
    }
    
    public Code getCode() {
        return this.id;
    }

    public void describe(PrintStream out) {
        for(ContextEvaluation ce : this.evaluations) {
            out.println("\t" + ce);
        }
    }
    
}