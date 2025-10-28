// AI-powered response suggestions based on prayer request content
export const getAISuggestions = (prayerText) => {
    const lowerText = prayerText.toLowerCase();
    
    // Health-related prayers
    if (lowerText.includes('health') || lowerText.includes('sick') || lowerText.includes('pain') || 
        lowerText.includes('hospital') || lowerText.includes('surgery') || lowerText.includes('doctor')) {
      return [
        "Praying for your healing and recovery. May you feel God's comforting presence during this time.",
        "Lifting you up in prayer for restored health and strength. You are not alone in this journey.",
        "Sending prayers for comfort and peace. May the medical team have wisdom and may healing come swiftly."
      ];
    }
    
    // Job/Work/Financial prayers
    if (lowerText.includes('job') || lowerText.includes('work') || lowerText.includes('financial') || 
        lowerText.includes('money') || lowerText.includes('unemployed') || lowerText.includes('career')) {
      return [
        "Praying for God's provision and guidance in your career journey. Trust that new doors will open.",
        "Holding you in prayer during this uncertain time. May you find peace and clarity about your next steps.",
        "Lifting up your financial needs. Praying for wisdom, opportunity, and breakthrough in your situation."
      ];
    }
    
    // Family/Relationship prayers
    if (lowerText.includes('family') || lowerText.includes('marriage') || lowerText.includes('relationship') || 
        lowerText.includes('spouse') || lowerText.includes('children') || lowerText.includes('parent')) {
      return [
        "Praying for healing and restoration in your family relationships. May God's love bring unity and peace.",
        "Lifting up your loved ones in prayer. May wisdom and understanding guide your family through this season.",
        "Holding your family close in prayer. Trusting God to work in hearts and bring reconciliation."
      ];
    }
    
    // Grief/Loss prayers
    if (lowerText.includes('loss') || lowerText.includes('died') || lowerText.includes('death') || 
        lowerText.includes('grief') || lowerText.includes('passed away') || lowerText.includes('funeral')) {
      return [
        "Holding you gently in prayer during this profound loss. May you feel surrounded by love and comfort.",
        "Praying for peace that transcends understanding as you grieve. You are deeply cared for during this time.",
        "Lifting you up with tender prayers. May beautiful memories bring comfort and may God's presence be near."
      ];
    }
    
    // Anxiety/Depression/Mental Health prayers
    if (lowerText.includes('anxiety') || lowerText.includes('depression') || lowerText.includes('mental') || 
        lowerText.includes('stress') || lowerText.includes('overwhelmed') || lowerText.includes('scared')) {
      return [
        "Praying for peace to fill your heart and mind. You are stronger than you know, and you're not alone.",
        "Lifting you up for emotional healing and strength. May you find the support and help you need.",
        "Holding you in prayer for mental wellness and peace. May anxiety be replaced with God's perfect calm."
      ];
    }
    
    // Guidance/Decision prayers
    if (lowerText.includes('decision') || lowerText.includes('guidance') || lowerText.includes('direction') || 
        lowerText.includes('confused') || lowerText.includes('choice') || lowerText.includes('uncertain')) {
      return [
        "Praying for clarity and wisdom as you make this important decision. May God's guidance be unmistakable.",
        "Lifting you up for divine direction. Trust that the right path will become clear in perfect timing.",
        "Holding you in prayer for discernment and peace. May you feel confident in the steps you take."
      ];
    }
    
    // Default/General prayers (if no specific keywords match)
    return [
      "Thank you for sharing your heart. Praying for God's peace and presence to surround you.",
      "Lifting you up in prayer. May you experience comfort, strength, and hope during this time.",
      "Holding you close in prayer. Trusting that God hears your heart and will answer according to His perfect plan."
    ];
  };